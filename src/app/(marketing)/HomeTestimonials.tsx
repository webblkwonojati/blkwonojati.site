"use client";

import { Card, Typography, Flex, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { motion } from "framer-motion";

const { Title, Text, Paragraph } = Typography;

const testimonials = [
  { 
    name: "Andi Wijaya", 
    role: "Owner GreenFarm", 
    text: "Kurikulum praktis dan pelatihan yang dipandu langsung oleh praktisi industri memberikan fondasi yang kuat bagi bisnis saya." 
  },
  { 
    name: "Siti Aminah", 
    role: "Alumni Barista", 
    text: "Dukungan komunitas yang luar biasa membantu saya membuka kedai kopi sendiri setelah lulus dari program BLK." 
  },
  { 
    name: "Budi Santoso", 
    role: "Specialist Hydro", 
    text: "Modul pelatihan kelas dunia yang menjembatani kesenjangan antara teori dan praktik lapangan yang sebenarnya." 
  }
];

export default function HomeTestimonials() {
  return (
    <section className="py-24 px-6 bg-transparent border-b border-slate-50 relative overflow-hidden">
      {/* Subtle Batik Pattern - Ultra Soft Opacity */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, -100],
            y: [0, -100]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            backgroundImage: "url('/batik.png')", 
            backgroundSize: "1200px",
            filter: "invert(1) brightness(0.5)" 
          }}
          className="absolute -inset-[400px]"
        />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <Text className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2 block">Testimonials</Text>
          <Title level={2} className="!m-0 !text-4xl md:!text-5xl !font-bold !tracking-tighter !text-slate-900 border-none !font-display !leading-none">
            Cerita Sukses Alumni
          </Title>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card 
              key={i} 
              className="rounded-2xl border-slate-100 shadow-sm hover:border-slate-200 transition-all duration-300"
              styles={{ body: { padding: '24px' } }}
            >
              <Flex vertical gap="middle">
                <Paragraph className="!m-0 text-slate-500 italic leading-relaxed text-sm md:text-base font-medium min-h-[100px]">
                  "{t.text}"
                </Paragraph>
                
                <Flex align="center" gap="middle" className="mt-2 text-left">
                  <Avatar size={36} icon={<UserOutlined />} className="bg-slate-50 text-slate-300" />
                  <div className="flex flex-col">
                    <Text className="text-xs font-bold text-slate-900 leading-none mb-1">{t.name}</Text>
                    <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.role}</Text>
                  </div>
                </Flex>
              </Flex>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
