"use client";

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  Pagination, 
  Empty, 
  Modal, 
  Typography, 
  Flex,
  Badge
} from 'antd';
import { 
  CarryOutOutlined, 
  CloseOutlined 
} from '@ant-design/icons';
import Link from 'next/link';
import JobCard from './JobCard';

const { Title, Text, Paragraph } = Typography;

interface AnimatedLowonganProps {
  jobs: any[];
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 } 
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export default function AnimatedLowongan({ jobs }: AnimatedLowonganProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pageSize = 9;

  // Calculate visible range
  const startIndex = (currentPage - 1) * pageSize;
  const visibleJobs = jobs.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 mt-8">
      {/* Stats / Results Count */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
         <Flex align="center" gap="middle">
            <Badge 
              count={jobs.length} 
              overflowCount={999} 
              style={{ backgroundColor: '#0f172a', color: '#fff', fontSize: '10px' }} 
              className="font-bold scale-90"
            />
            <span className="uppercase tracking-[0.15em] text-[10px] font-semibold text-slate-400">
               Peluang Ditemukan
            </span>
         </Flex>
         <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider hidden md:block">
            Halaman {currentPage} dari {Math.ceil(jobs.length / pageSize)}
         </span>
      </div>

      {/* Grid */}
      {jobs.length === 0 ? (
        <div className="py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-200">
          <Empty 
            image={<CarryOutOutlined className="text-6xl text-slate-200" />}
            description={
              <Flex vertical align="center" gap={0}>
                <Title level={4} className="!m-0 !font-bold">Lowongan Tidak Ditemukan</Title>
                <Text type="secondary" className="text-sm">Kami tidak menemukan pekerjaan yang sesuai dengan kriteria Anda.</Text>
              </Flex>
            }
          >
            <button 
              onClick={() => window.location.href = '/lowongan-kerja'}
              className="mt-6 group relative flex items-center gap-3 px-6 h-10 bg-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 mx-auto"
            >
              <span className="relative z-10">Reset Semua Filter</span>
              <span className="material-symbols-outlined text-sm relative z-10 group-hover:rotate-180 transition-transform">restart_alt</span>
            </button>
          </Empty>
        </div>
      ) : (
        <>
          <motion.div 
            key={currentPage}
            variants={container}
            initial="hidden"
            animate="show"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleJobs.map((j: any) => (
                <motion.div 
                  variants={item} 
                  layout 
                  key={j.id}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <JobCard job={j} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* AntD Pagination */}
          <div className="flex justify-center pt-20 border-t border-slate-50">
            <Pagination 
              current={currentPage}
              total={jobs.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
              className="custom-antd-pagination"
            />
          </div>
        </>
      )}

      {/* Login Prompt Modal (AntD) */}
      <Modal
        open={showLoginModal}
        onCancel={() => setShowLoginModal(false)}
        footer={null}
        closeIcon={<CloseOutlined className="text-white hover:rotate-90 transition-transform" />}
        styles={{ 
          body: { padding: 0, borderRadius: '1.5rem', overflow: 'hidden' }
        }}
        centered
        width={400}
      >
        <div className="bg-slate-900 p-6 md:p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
             <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl text-primary">bolt</span>
             </div>
             <Title level={3} className="!text-white !font-bold !mb-2 !tracking-tight">Eksplorasi Karir</Title>
             <Paragraph className="text-slate-400 font-medium text-sm !m-0">
               Masuk untuk mendapatkan akses penuh ke detail lowongan eksklusif dari mitra industri kami.
             </Paragraph>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
        </div>
        <div className="p-6 md:p-8 space-y-4">
           <Link 
             href="/login" 
             className="group relative flex items-center justify-center gap-3 w-full h-12 bg-primary rounded-lg text-[10px] font-bold uppercase tracking-widest text-white hover:opacity-90 transition-all duration-300 shadow-lg shadow-green-500/20 active:scale-95 overflow-hidden"
           >
              <span className="relative z-10">Masuk Sekarang</span>
              <span className="material-symbols-outlined text-sm relative z-10 group-hover:translate-x-1 transition-transform">login</span>
           </Link>
           
           <Link 
             href="/register" 
             className="group relative flex items-center justify-center gap-3 w-full h-12 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all duration-300 active:scale-95 overflow-hidden"
           >
              <span className="relative z-10">Belum punya akun?</span>
              <span className="material-symbols-outlined text-sm relative z-10">person_add</span>
           </Link>

           <button 
             onClick={() => setShowLoginModal(false)} 
             className="w-full text-center text-slate-400 font-bold uppercase text-[9px] tracking-widest mt-2 hover:text-slate-600 transition-colors"
           >
             Nanti Saja
           </button>
        </div>
      </Modal>
    </div>
  );
}
