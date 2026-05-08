'use client';

import React, { useState, useRef } from 'react';

interface FileUploadProps {
  initialValue?: string;
  onUploadComplete: (url: string) => void;
  label?: string;
}

export default function FileUpload({ initialValue, onUploadComplete, label }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialValue || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      // Extract filename for preview
      setPreview(file.name);

      // Upload to GitHub via our API
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/github/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to upload to GitHub');
      }

      const data = await response.json();
      onUploadComplete(data.url);
      setPreview(data.url); // Set to final URL or keep filename
    } catch (error: any) {
      alert('Error uploading file: ' + error.message);
      setPreview(initialValue || null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/50 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center bg-slate-50 relative p-6 group"
      >
        {preview ? (
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-green-500 mb-2">task</span>
            <p className="text-[12px] font-bold text-slate-700 break-all px-4">
              {preview.split('/').pop()}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-primary mt-2">Klik untuk ganti file</p>
          </div>
        ) : (
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-red-500 transition-colors">upload_file</span>
            <p className="text-[12px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Pilih File PDF</p>
          </div>
        )}
        
        {uploading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <span className="material-symbols-outlined animate-spin text-primary text-3xl mb-2">refresh</span>
            <p className="text-xs font-bold text-slate-600 animate-pulse">Mengunggah...</p>
          </div>
        )}
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        accept="application/pdf" 
        className="hidden" 
      />
    </div>
  );
}
