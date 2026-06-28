"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, MapPin, BookOpen, X, ChevronDown } from 'lucide-react';

const kategoriOptions = [
  { value: '', label: 'Semua Kategori' },
  { value: 'IT', label: 'IT' },
  { value: 'Las', label: 'Las' },
  { value: 'Menjahit', label: 'Menjahit' },
  { value: 'Otomotif', label: 'Otomotif' },
  { value: 'Tata Boga', label: 'Tata Boga' },
];

const tipeOptions = [
  { value: '', label: 'Semua Tipe' },
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Magang', label: 'Magang' },
  { value: 'Kontrak', label: 'Kontrak' },
];

const lokasiOptions = [
  { value: '', label: 'Semua Lokasi' },
  { value: 'Malang Raya', label: 'Malang Raya' },
  { value: 'Surabaya', label: 'Surabaya' },
  { value: 'Luar Kota', label: 'Luar Kota' },
  { value: 'Remote', label: 'Remote' },
];

function SelectInput({ value, onChange, options, icon, placeholder, className }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  icon: React.ReactNode;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className || ''}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none">
        {icon}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 pl-9 pr-8 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}

export default function FilterLowongan() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [kategori, setKategori] = useState(searchParams.get('kategori') || '');
  const [tipe, setTipe] = useState(searchParams.get('tipe') || '');
  const [lokasi, setLokasi] = useState(searchParams.get('lokasi') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
  };

  useEffect(() => {
    const currentKategori = searchParams.get('kategori') || '';
    const currentTipe = searchParams.get('tipe') || '';
    const currentLokasi = searchParams.get('lokasi') || '';

    if (kategori !== currentKategori || tipe !== currentTipe || lokasi !== currentLokasi) {
      submitFilter();
    }
  }, [kategori, tipe, lokasi]);

  const FilterInputs = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 w-full`}>
      <SelectInput
        value={kategori}
        onChange={setKategori}
        options={kategoriOptions}
        icon={<BookOpen className="w-4 h-4" />}
        placeholder="Kategori"
        className={isMobile ? 'w-full' : 'w-48'}
      />
      <SelectInput
        value={tipe}
        onChange={setTipe}
        options={tipeOptions}
        icon={<Filter className="w-4 h-4" />}
        placeholder="Tipe"
        className={isMobile ? 'w-full' : 'w-48'}
      />
      <SelectInput
        value={lokasi}
        onChange={setLokasi}
        options={lokasiOptions}
        icon={<MapPin className="w-4 h-4" />}
        placeholder="Lokasi"
        className={isMobile ? 'w-full' : 'w-48'}
      />
      {(query || kategori || tipe || lokasi) && (
        <button
          onClick={clearFilter}
          className="h-12 px-4 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all flex items-center gap-2 shrink-0"
        >
          <X className="w-4 h-4" />
          Reset
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
        <div className="flex-1 relative w-full">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            placeholder="Cari posisi atau instansi pekerjaan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitFilter()}
            onBlur={submitFilter}
            aria-label="Cari lowongan pekerjaan"
            className="w-full h-12 lg:h-14 pl-11 pr-4 rounded-2xl bg-white border border-slate-200 hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium shadow-sm"
          />
        </div>

        <div className="lg:hidden shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-6 rounded-2xl border border-slate-200 text-slate-600 font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-slate-900">Filter Pencarian</h4>
                  <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <FilterInputs isMobile />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full mt-6 rounded-2xl h-14 font-bold uppercase text-xs tracking-widest bg-primary text-white hover:bg-primary-dark transition-all"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          <FilterInputs />
        </div>
      </div>
    </div>
  );
}
