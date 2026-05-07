import { getLowongan } from './actions';
import LowonganClient from './LowonganClient';

export const dynamic = 'force-dynamic';

export default async function LowonganPage() {
  const initialJobs = await getLowongan();

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-lexend">Manajemen Lowongan Kerja</h1>
        <p className="text-slate-500 font-medium">Kelola dan publikasikan lowongan pekerjaan aktif untuk alumni BLK.</p>
      </div>
      
      <LowonganClient initialJobs={initialJobs} />
    </div>
  );
}
