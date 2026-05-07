'use client';

import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  initialValue?: string;
  onUploadComplete: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ initialValue, onUploadComplete, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialValue || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

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
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative aspect-video w-full rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/50 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center bg-slate-50 group"
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-sm">
              Ganti Gambar
            </div>
          </>
        ) : (
          <div className="text-center p-6 bg-white/50">
            <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-primary transition-colors">add_photo_alternate</span>
            <p className="text-[12px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Klik untuk Upload Poster</p>
          </div>
        )}
        
        {uploading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="material-symbols-outlined animate-spin text-primary text-3xl">refresh</span>
          </div>
        )}
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        accept="image/*" 
        className="hidden" 
      />
      <p className="text-[10px] text-slate-400 font-medium italic">* Disarankan aspek rasio 16:9 atau 1:1 (Max 2MB)</p>
    </div>
  );
}
