'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function FilterLowongan() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load initial state from URL params
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [kategori, setKategori] = useState(searchParams.get('kategori') || '');
  const [tipe, setTipe] = useState(searchParams.get('tipe') || '');
  const [lokasi, setLokasi] = useState(searchParams.get('lokasi') || '');

  // Handle Search on Enter or Button Click
  const submitFilter = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (kategori) params.set('kategori', kategori);
    if (tipe) params.set('tipe', tipe);
    if (lokasi) params.set('lokasi', lokasi);

    router.push(`/lowongan-kerja?${params.toString()}`, { scroll: false });
  };

  const clearFilter = () => {
    setQuery('');
    setKategori('');
    setTipe('');
    setLokasi('');
    router.push('/lowongan-kerja', { scroll: false });
  };

  // We can optionally use debounce to update URL directly if client prefers real-time
  // but to keep it simple and clean, trigger on change for dropdowns and blur/enter for text.
  
  // Real-time update for select changes
  useEffect(() => {
    // Only auto-submit on select changes if it differs from current params
    const currentKategori = searchParams.get('kategori') || '';
    const currentTipe = searchParams.get('tipe') || '';
    const currentLokasi = searchParams.get('lokasi') || '';
    
    if (kategori !== currentKategori || tipe !== currentTipe || lokasi !== currentLokasi) {
      submitFilter();
    }
  }, [kategori, tipe, lokasi]);

  // Handle key press for search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitFilter();
    }
  };

  const FilterInputs = () => (
    <>
      {/* Kategori Dropdown */}
      <div className="relative shrink-0 w-full lg:w-48 group">
        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="w-full pl-10 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-700 font-medium appearance-none cursor-pointer"
        >
          <option value="">Semua Kategori</option>
          <option value="IT">IT</option>
          <option value="Las">Las</option>
          <option value="Menjahit">Menjahit</option>
          <option value="Otomotif">Otomotif</option>
          <option value="Tata Boga">Tata Boga</option>
        </select>
      </div>

      {/* Tipe Pekerjaan Dropdown */}
      <div className="relative shrink-0 w-full lg:w-48 group">
        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <select
          value={tipe}
          onChange={(e) => setTipe(e.target.value)}
          className="w-full pl-10 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-700 font-medium appearance-none cursor-pointer"
        >
          <option value="">Semua Tipe</option>
          <option value="Full-time">Full-time</option>
          <option value="Magang">Magang</option>
          <option value="Kontrak">Kontrak</option>
        </select>
      </div>

      {/* Lokasi Dropdown */}
      <div className="relative shrink-0 w-full lg:w-48 group">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <select
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          className="w-full pl-10 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-700 font-medium appearance-none cursor-pointer"
        >
          <option value="">Semua Lokasi</option>
          <option value="Malang Raya">Malang Raya</option>
          <option value="Surabaya">Surabaya</option>
          <option value="Luar Kota">Luar Kota</option>
          <option value="Remote">Remote</option>
        </select>
      </div>
      
      {/* Reset Button */}
      {(query || kategori || tipe || lokasi) && (
        <Button 
          onClick={clearFilter}
          variant="ghost" 
          className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-2xl px-6 py-4 h-auto w-full lg:w-auto mt-2 lg:mt-0"
        >
          Reset Filter
        </Button>
      )}
    </>
  );

  return (
    <div className="bg-white rounded-3xl p-4 lg:p-6 shadow-sm border border-slate-200 mb-10 w-full">
      <div className="flex flex-row gap-4 items-center w-full">
        {/* Search Input always visible */}
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Cari pekerjaan..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={submitFilter}
            className="w-full pl-12 pr-4 py-3 lg:py-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Mobile Filter Trigger Button */}
        <div className="lg:hidden shrink-0">
          <Dialog>
            <DialogTrigger render={
              <Button variant="outline" className="h-[48px] px-4 rounded-2xl border-slate-200 shadow-sm text-slate-600">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </Button>
            } />
            <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 bg-white border-slate-100">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-800">Filter Pencarian</DialogTitle>
                <DialogDescription>
                  Sesuaikan kriteria pencarian lowongan kerja Anda.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-6">
                <FilterInputs />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Desktop Filter Row */}
        <div className="hidden lg:flex flex-row items-center gap-4">
          <FilterInputs />
        </div>
      </div>
    </div>
  );
}
