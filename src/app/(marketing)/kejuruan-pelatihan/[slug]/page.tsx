import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons";
import SectionHeader from "@/components/marketing/SectionHeader";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data } = await supabaseAdmin
    .from('kejuruan_pelatihan')
    .select('title, subtitle')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!data) return { title: "Program Tidak Ditemukan" };

  return {
    title: `${data.title} | UPT BLK Wonojati`,
    description: data.subtitle,
  };
}

export default async function DetailKejuruanPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data: program, error } = await supabaseAdmin
    .from('kejuruan_pelatihan')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .eq('is_active', true)
    .single();

  if (error || !program) {
    notFound();
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-transparent font-sans">
      <div className="flex-1 pb-32">
        {/* Detail Hero Section */}
        <section className="pt-28 md:pt-32 pb-16 px-6 relative overflow-hidden">
          <div className="mx-auto max-w-4xl relative z-10">
            <Link 
              href="/kejuruan-pelatihan"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 hover:bg-white text-sm font-bold text-slate-600 hover:text-primary transition-all border border-slate-200 mb-8 shadow-sm backdrop-blur-md"
            >
              <ArrowLeftOutlined /> Kembali ke Daftar
            </Link>

            <SectionHeader
              badge={program.category || "Program Kejuruan"}
              title={program.title}
              description={program.subtitle}
              align="left"
            />

            {program.hero_image && (
              <div className="mt-10 overflow-hidden relative group">
                {/* Scroll horizontally with native CSS snap */}
                <div className="flex w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar rounded-[1.5rem] md:rounded-[2rem] border-4 border-white shadow-xl bg-slate-100 flex-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {program.hero_image.split(',').map((url: string, idx: number) => (
                    <div key={idx} className="w-full shrink-0 snap-center relative flex justify-center items-center overflow-hidden">
                      <Image 
                        src={url.trim()}
                        alt={`${program.title} - Gambar ${idx + 1}`}
                        width={1200}
                        height={800}
                        className="w-full h-[50vh] md:h-[60vh] object-contain transition-transform duration-700 bg-slate-900/5 group-hover:scale-105"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>
                {/* Custom styling for hiding scrollbar */}
                <style dangerouslySetInnerHTML={{__html: `
                  .hide-scrollbar::-webkit-scrollbar { display: none; }
                `}} />
                
                {/* Indicator kalau slidernya ada lebih dari 1 */}
                {program.hero_image.split(',').length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {program.hero_image.split(',').map((_: any, i: number) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-slate-900/30 backdrop-blur-md" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Rich Text Content */}
        <section className="px-6 relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-12 items-start relative">
              
              {/* Main Content (HTML) - Fixed Typography Selectors */}
              <div className="flex-1 w-full max-w-none 
                  [&_h1]:font-display [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:text-2xl md:[&_h1]:text-3xl [&_h1]:mb-6 [&_h1]:mt-8
                  [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:text-xl md:[&_h2]:text-2xl [&_h2]:mb-4 [&_h2]:mt-8
                  [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:mb-3 [&_h3]:mt-6
                  [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-5
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-slate-600 space-y-2
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:text-slate-600 
                  [&_li]:pl-1 [&_li]:mb-2
                  [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4
                  [&_strong]:font-bold [&_strong]:text-slate-800
                  [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:max-w-full [&_img]:my-6
                  [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500 [&_blockquote]:my-6">
                <div dangerouslySetInnerHTML={{ __html: program.content_html || '<p>Detail deskripsi belum tersedia.</p>' }} />
              </div>

              {/* Floating Download Card - Sticky Sidebar */}
              {program.pdf_url && (
                <div className="w-full md:w-80 shrink-0 sticky top-32">
                  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none" />
                     
                     <h3 className="text-white font-bold text-lg leading-tight mb-2">Dokumen Kurikulum</h3>
                     <p className="text-slate-400 text-xs mb-6 font-medium">
                       Unduh silabus lengkap untuk mempelajari modul apa saja yang diberikan.
                     </p>

                     <a 
                       href={program.pdf_url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary/90 text-white font-bold text-sm py-4 px-6 rounded-xl transition-all shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50"
                     >
                       <DownloadOutlined className="text-lg" /> Unduh PDF
                     </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
