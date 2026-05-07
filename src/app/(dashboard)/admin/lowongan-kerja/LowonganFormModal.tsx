'use client';

import React, { useState } from 'react';
import { addLowongan, editLowongan } from './actions';
import ImageUpload from '@/components/ImageUpload';

export default function LowonganFormModal({ isOpen, onClose, jobData }: any) {
  const [loading, setLoading] = useState(false);
  const [posterUrl, setPosterUrl] = useState(jobData?.poster_url || '');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('poster_url', posterUrl);
    let res;

    if (jobData?.id) {
      formData.append('id', jobData.id);
      res = await editLowongan(formData);
    } else {
      res = await addLowongan(formData);
    }

    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      alert('Error: ' + res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-slate-900">
      <div className="bg-white rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col font-inter">
        <div className="p-6 border-b border-primary/10 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-slate-900">
            {jobData ? 'Edit Lowongan Kerja' : 'Tambah Lowongan Kerja'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors p-2 bg-slate-100 rounded-full">
             <span className="material-symbols-outlined block">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1 overflow-y-auto">
          <ImageUpload 
            label="Poster/Gambar Lowongan" 
            initialValue={jobData?.poster_url} 
            onUploadComplete={(url) => setPosterUrl(url)} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Posisi Pekerjaan</label>
              <input name="posisi" required defaultValue={jobData?.posisi} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white text-sm" placeholder="contoh: Software Engineer" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Instansi/Perusahaan</label>
              <input name="instansi_perusahaan" required defaultValue={jobData?.instansi_perusahaan} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white text-sm" placeholder="Nama Perusahaan" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Lokasi</label>
              <input name="lokasi" required defaultValue={jobData?.lokasi} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white text-sm" placeholder="e.g. Jakarta, Remote" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tipe Pekerjaan</label>
              <select name="tipe_pekerjaan" required defaultValue={jobData?.tipe_pekerjaan || 'Full-time'} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white text-sm">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Magang">Magang</option>
                <option value="Kontrak">Kontrak</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Jurusan Terkait</label>
              <select name="jurusan" required defaultValue={jobData?.jurusan || 'Semua Jurusan'} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white text-sm">
                <option value="Semua Jurusan">Semua Jurusan</option>
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Teknik Otomotif">Teknik Otomotif</option>
                <option value="Teknik Las">Teknik Las</option>
                <option value="Garmen/Tata Busana">Garmen/Tata Busana</option>
                <option value="Tata Boga">Tata Boga</option>
                <option value="Pertanian/Hidroponik">Pertanian/Hidroponik</option>
                <option value="Teknik Pendingin">Teknik Pendingin</option>
                <option value="Kecantikan">Kecantikan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Batas Lamaran (Expire Date)</label>
              <input name="batas_lamaran" type="datetime-local" defaultValue={jobData?.batas_lamaran ? new Date(jobData.batas_lamaran).toISOString().slice(0, 16) : ''} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Link Pendaftaran (Apply URL)</label>
              <input name="link_pendaftaran" type="url" required defaultValue={jobData?.link_pendaftaran} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white text-sm" placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi Pekerjaan</label>
            <textarea name="deskripsi" required defaultValue={jobData?.deskripsi} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white resize-none text-sm" placeholder="Jelaskan peran ini..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Syarat & Kualifikasi</label>
            <textarea name="kualifikasi" required defaultValue={jobData?.kualifikasi} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white resize-none text-sm" placeholder="Persyaratan kandidat..." />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white z-10">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
              Batal
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl font-semibold text-background-dark bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center gap-2 disabled:opacity-50">
              {loading ? <span className="material-symbols-outlined min-w-5 min-h-5 animate-spin">refresh</span> : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
