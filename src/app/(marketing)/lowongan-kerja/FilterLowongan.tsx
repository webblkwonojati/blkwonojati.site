"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Input, 
  Select, 
  Button, 
  Modal, 
  Flex,
  ConfigProvider,
  Typography
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  EnvironmentOutlined, 
  CarryOutOutlined, 
  ReadOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const { Title } = Typography;

export default function FilterLowongan() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load initial state from URL params
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [kategori, setKategori] = useState(searchParams.get('kategori') || '');
  const [tipe, setTipe] = useState(searchParams.get('tipe') || '');
  const [lokasi, setLokasi] = useState(searchParams.get('lokasi') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  <Flex vertical={isMobile} className="w-full" gap={isMobile ? "middle" : "small"}>
      <Select
        value={kategori}
        onChange={setKategori}
        prefix={<ReadOutlined className="text-slate-400" />}
        className="w-full lg:w-48 h-12 custom-antd-select"
        placeholder="Kategori"
        options={[
          { value: '', label: 'Semua Kategori' },
          { value: 'IT', label: 'IT' },
          { value: 'Las', label: 'Las' },
          { value: 'Menjahit', label: 'Menjahit' },
          { value: 'Otomotif', label: 'Otomotif' },
          { value: 'Tata Boga', label: 'Tata Boga' },
        ]}
      />

      <Select
        value={tipe}
        onChange={setTipe}
        prefix={<CarryOutOutlined className="text-slate-400" />}
        className="w-full lg:w-48 h-12 custom-antd-select"
        placeholder="Tipe"
        options={[
          { value: '', label: 'Semua Tipe' },
          { value: 'Full-time', label: 'Full-time' },
          { value: 'Magang', label: 'Magang' },
          { value: 'Kontrak', label: 'Kontrak' },
        ]}
      />

      <Select
        value={lokasi}
        onChange={setLokasi}
        prefix={<EnvironmentOutlined className="text-slate-400" />}
        className="w-full lg:w-48 h-12 custom-antd-select"
        placeholder="Lokasi"
        options={[
          { value: '', label: 'Semua Lokasi' },
          { value: 'Malang Raya', label: 'Malang Raya' },
          { value: 'Surabaya', label: 'Surabaya' },
          { value: 'Luar Kota', label: 'Luar Kota' },
          { value: 'Remote', label: 'Remote' },
        ]}
      />
      
      {(query || kategori || tipe || lokasi) && (
        <Button 
          type="text" 
          danger 
          icon={<CloseCircleOutlined />}
          onClick={clearFilter}
          className="font-bold flex items-center h-12 px-4 rounded-xl"
        >
          Reset
        </Button>
      )}
    </Flex>
  );

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
        {/* Search Input */}
        <div className="flex-1">
          <Input 
            prefix={<SearchOutlined className="text-primary mr-2" />}
            placeholder="Cari posisi atau instansi pekerjaan..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onPressEnter={submitFilter}
            onBlur={submitFilter}
            className="h-12 lg:h-14 rounded-2xl bg-white border-slate-200 hover:border-primary focus:border-primary transition-all text-sm font-medium shadow-sm"
          />
        </div>

        {/* Mobile Filter */}
        <div className="lg:hidden shrink-0">
          <Button 
            icon={<FilterOutlined />} 
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-6 rounded-2xl border-slate-200 text-slate-600 font-bold"
          >
            Filter
          </Button>
          <Modal
            title={<Title level={4} className="!m-0">Filter Pencarian</Title>}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            className="custom-antd-modal"
            centered
          >
            <div className="py-6">
              <FilterInputs isMobile />
              <Button 
                type="primary" 
                block 
                size="large" 
                className="mt-8 rounded-2xl h-14 font-bold uppercase text-xs tracking-widest"
                onClick={() => setIsModalOpen(false)}
              >
                Terapkan Filter
              </Button>
            </div>
          </Modal>
        </div>

        {/* Desktop Filter */}
        <div className="hidden lg:block">
          <FilterInputs />
        </div>
      </div>
    </div>
  );
}
