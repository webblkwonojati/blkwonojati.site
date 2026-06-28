'use client';

import React, { useState, useRef } from 'react';
import { Trash2, Loader, ImagePlus } from "lucide-react";

interface MultiImageUploadProps {
  initialValue?: string; // string di-join dengan koma
  onUploadComplete: (url: string) => void;
  label?: string;
}

export default function MultiImageUpload({ initialValue, onUploadComplete, label }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  
  // Pisahkan dengan koma jikalau ada beberapa gambar
  const initArr = initialValue && typeof initialValue === 'string' ? initialValue.split(',') : [];
  const [previews, setPreviews] = useState<string[]>(initArr);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const newUrls = [...previews];

      for (const file of files) {
        // Upload to GitHub via our API
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/github/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) continue;

        const data = await response.json();
        newUrls.push(data.url);
      }

      setPreviews(newUrls);
      onUploadComplete(newUrls.join(',')); // Simpan ke database dengan format dipisah koma
    } catch (error: any) {
      alert('Error uploading multiple images: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const filtered = previews.filter((_, idx) => idx !== indexToRemove);
    setPreviews(filtered);
    onUploadComplete(filtered.join(','));
  };

  return (
    <div className="space-y-4">
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      
      {/* List Preview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {previews.map((preview, idx) => (
          <div key={idx} className="relative aspect-video rounded-xl border border-slate-200 overflow-hidden group">
            <img src={preview} alt={`Slider ${idx + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button" 
                onClick={() => removeImage(idx)}
                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        
        {/* Tombol Add More */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-primary/50 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center bg-slate-50 group hover:shadow-sm"
        >
          {uploading ? (
            <Loader className="w-8 h-8 animate-spin text-primary" />
          ) : (
            <>
              <ImagePlus className="w-6 h-6 text-slate-300 group-hover:text-primary transition-colors" />
              <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest text-center px-2">Tambah Gambar</p>
            </>
          )}
        </div>
      </div>

      <input 
        type="file" 
        multiple
        ref={fileInputRef} 
        onChange={handleUpload} 
        accept="image/*" 
        className="hidden" 
      />
      <p className="text-[10px] text-slate-500 font-medium italic">* Bisa mengunggah banyak gambar sekaligus. Gambar-gambar ini akan menjadi Slider (Carousel).</p>
    </div>
  );
}
