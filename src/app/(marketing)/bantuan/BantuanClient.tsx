"use client";

import { Collapse, Typography, Button, Flex } from "antd";
import { 
  QuestionCircleOutlined, 
  MessageOutlined, 
  WhatsAppOutlined, 
  RightOutlined 
} from "@ant-design/icons";
import SectionHeader from "@/components/marketing/SectionHeader";

const { Title, Text, Paragraph } = Typography;

const faqs = [
  { 
    key: '1',
    label: "Bagaimana cara mendaftar pelatihan?", 
    children: "Anda dapat mendaftar secara online melalui tombol 'Pendaftaran' di header atau datang langsung ke kantor UPT BLK Wonojati dengan membawa dokumen persyaratan." 
  },
  { 
    key: '2',
    label: "Apakah pelatihan ini dipungut biaya?", 
    children: "Seluruh program pelatihan reguler di UPT BLK Wonojati disubsidi penuh oleh pemerintah (APBN/APBD) sehingga GRATIS bagi peserta yang lolos seleksi." 
  },
  { 
    key: '3',
    label: "Syarat apa saja yang harus disiapkan?", 
    children: "Syarat utama meliputi fotokopi KTP, fotokopi ijazah terakhir (minimal SMP/SMA tergantung kejuruan), pas foto terbaru, dan usia minimal 18 tahun." 
  },
  { 
    key: '4',
    label: "Berapa lama durasi pelatihannya?", 
    children: "Durasi bervariasi antara 120 hingga 480 jam pelatihan (sekitar 1-3 bulan) dengan jadwal Senin hingga Jumat pukul 08:00 - 15:00 WIB." 
  }
];

import nextDynamic from "next/dynamic";

// Hoisted static mapping to prevent re-creation on every render
const FAQ_ITEMS = faqs.map((faq) => ({
  key: faq.key,
  label: (
    <Text className="text-base md:text-lg font-bold text-slate-800 py-3 block tracking-tight">
      {faq.label}
    </Text>
  ),
  children: (
    <Paragraph className="text-slate-500 leading-relaxed text-sm md:text-base font-medium pb-4">
      {faq.children}
    </Paragraph>
  ),
}));

// Dynamic Import for heavy Map component
const LeafletMap = nextDynamic(() => import("@/components/marketing/LeafletMap"), {
  ssr: false, // Leaflet depends on window
  loading: () => <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">Memuat peta...</div>
});

export default function BantuanClient() {
  return (
    <div className="mx-auto max-w-4xl font-sans">
      <SectionHeader 
        withBreadcrumbs
        badge="FAQ & Support"
        title="Pusat Bantuan"
        description="Temukan jawaban atas pertanyaan umum seputar pelatihan kami di UPT BLK Wonojati."
        className="mb-16"
      />

      <Collapse
        accordion
        items={FAQ_ITEMS}
        expandIconPlacement="end"
        className="bg-transparent border-none"
        expandIcon={({ isActive }) => (
          <RightOutlined className={`transition-transform text-slate-300 ${isActive ? 'rotate-90 text-primary' : ''}`} />
        )}
      />

      {/* Location Section - Refined Layout */}
      <div className="mt-24 md:mt-32 p-1 bg-slate-50 rounded-[1.5rem] md:rounded-[3rem] border border-slate-100/50">
        <div className="bg-white rounded-[1.4rem] md:rounded-[2.8rem] overflow-hidden shadow-sm border border-slate-100">
          <div className="grid lg:grid-cols-12">
            {/* Map Area */}
            <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[350px] relative">
              <LeafletMap />
              {/* Badge Overlay */}
              <div className="absolute top-6 left-6 z-[1000]">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Lokasi Utama Workshop</Text>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-5 p-6 md:p-10 lg:p-14 flex flex-col justify-center bg-slate-50/30">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                 <MessageOutlined className="text-xl" />
              </div>
              
              <Title level={2} className="!text-2xl md:!text-3xl !font-bold !tracking-tight !text-slate-900 mb-6 !leading-tight">
                Kunjungi Workshop <br className="hidden md:block" />Kami di Wonojati
              </Title>
              
              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 mt-1">
                    <RightOutlined className="text-[8px]" />
                  </div>
                  <Paragraph className="text-slate-500 text-sm font-medium m-0 leading-relaxed">
                    Jalan Raya Mondoroko Nomor 1, Singosari, Malang, Jawa Timur.
                  </Paragraph>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 mt-1">
                    <RightOutlined className="text-[8px]" />
                  </div>
                  <div className="space-y-1">
                    <Text className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Jam Operasional</Text>
                    <Text className="text-sm font-bold text-slate-700 block">Senin - Jumat | 08:00 - 15:00 WIB</Text>
                  </div>
                </div>
              </div>
              
              <Button 
                size="large"
                type="primary"
                href="https://maps.google.com/?q=UPT+BLK+Wonojati" 
                target="_blank"
                className="h-14 px-8 rounded-2xl font-bold bg-slate-900 border-none hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10"
              >
                Buka di Google Maps <RightOutlined className="text-[10px]" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra Minimalist CTA Section */}
      <div className="mt-20 md:mt-32 py-12 md:py-20 px-6 md:px-10 bg-slate-50 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100/50 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100 mb-8">
           <MessageOutlined className="text-3xl" />
        </div>
        
        <Title level={2} className="!m-0 !text-2xl md:!text-3xl !font-bold !tracking-tight !text-slate-900 border-none mb-4">
          Masih Memiliki Pertanyaan?
        </Title>
        
        <Text className="text-slate-500 text-lg font-medium max-w-xl mb-12 block">
          Tim bantuan kami siap membantu Anda dengan informasi pendaftaran dan detail lainnya secara langsung.
        </Text>

        <Flex gap="middle" align="center" className="flex-col sm:flex-row">
           <Button 
             size="large" 
             icon={<WhatsAppOutlined />}
             style={{ backgroundColor: '#10b981', borderColor: '#10b981', color: '#fff' }}
             className="h-14 px-10 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 shadow-xl shadow-emerald-500/10"
           >
             Hubungi via WhatsApp
           </Button>
           <Button 
             size="large" 
             icon={<QuestionCircleOutlined />}
             className="h-14 px-10 rounded-2xl font-bold text-slate-600 border-slate-200"
           >
             Panduan Lengkap
           </Button>
        </Flex>

        <div className="mt-12 flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <Text className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
             Operasional: Senin - Jumat (08:00 - 15:00)
           </Text>
        </div>
      </div>
    </div>
  );
}
