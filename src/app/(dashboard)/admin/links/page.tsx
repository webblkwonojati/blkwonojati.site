import { auth } from "@clerk/nextjs/server";
import { getLinks, getProfileById } from './actions';
import LinkManagerClient from './LinkManagerClient';

// We use the global UPT BLK profile ID for the central Linktree
const GLOBAL_PROFILE_ID = "11111111-1111-1111-1111-111111111111";

export default async function LinksPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return <div>Sesi tidak ditemukan. Silakan login kembali.</div>;
  }

  const initialLinks = await getLinks(GLOBAL_PROFILE_ID);
  const profile = await getProfileById(GLOBAL_PROFILE_ID);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black tracking-tight mb-2">Linktree Manager</h1>
        <p className="text-[#666] text-sm">Manage your profile, background, and public links for bio.wonojati.site.</p>
      </div>
      
      <LinkManagerClient initialLinks={initialLinks} initialProfile={profile} profileId={GLOBAL_PROFILE_ID} />
    </div>
  );
}
