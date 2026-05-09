import { auth } from "@clerk/nextjs/server";
import { getLinks, getProfileById } from './actions';
import LinkManagerClient from './LinkManagerClient';

export default async function LinksPage() {
  const { userId } = await auth();
  const PROFILE_ID = userId;
  
  if (!PROFILE_ID) {
    return <div>Sesi tidak ditemukan. Silakan login kembali.</div>;
  }

  const initialLinks = await getLinks(PROFILE_ID);
  const profile = await getProfileById(PROFILE_ID);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-lexend">Linktree Manager</h1>
        <p className="text-slate-500 font-medium">Manage your profile, background, and public links.</p>
      </div>
      
      <LinkManagerClient initialLinks={initialLinks} initialProfile={profile} profileId={PROFILE_ID} />
    </div>
  );
}
