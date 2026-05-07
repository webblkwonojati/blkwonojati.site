
export async function uploadToGithub(file: File | Buffer, fileName: string) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const path = process.env.GITHUB_PATH || 'uploads';

  if (!token || !owner || !repo) {
    throw new Error('GitHub configuration missing');
  }

  // Convert file/buffer to base64
  let content: string;
  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer();
    content = Buffer.from(arrayBuffer).toString('base64');
  } else {
    content = file.toString('base64');
  }

  const fullPath = `${path}/${Date.now()}-${fileName}`;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: `Upload image: ${fileName}`,
      content: content,
      branch: branch,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub Upload Error: ${error.message}`);
  }

  const data = await response.json();
  
  // Return JSDelivr URL
  // Format: https://cdn.jsdelivr.net/gh/owner/repo@branch/path
  return {
    url: `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${fullPath}`,
    path: fullPath,
    sha: data.content.sha
  };
}

export async function deleteFromGithub(filePath: string) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !owner || !repo) {
    throw new Error('GitHub configuration missing');
  }

  // First, get the file SHA
  const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  const getRes = await fetch(getUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!getRes.ok) {
    if (getRes.status === 404) return { success: true, message: 'File already deleted' };
    const error = await getRes.json();
    throw new Error(`GitHub Get Error: ${error.message}`);
  }

  const fileData = await getRes.json();
  const sha = fileData.sha;

  // Then, delete the file
  const deleteUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const deleteRes = await fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: `Delete image: ${filePath}`,
      sha: sha,
      branch: branch,
    }),
  });

  if (!deleteRes.ok) {
    const error = await deleteRes.json();
    throw new Error(`GitHub Delete Error: ${error.message}`);
  }

  return { success: true };
}
