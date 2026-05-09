import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ChevronLeft, Clock, Newspaper, ArrowRight, User } from "lucide-react";
import nextDynamic from "next/dynamic";
import ButtonPremium from "@/components/ui/ButtonPremium";

// Dynamic imports for client components
const ReadingProgressBar = nextDynamic(() => import("@/components/marketing/ReadingProgressBar"));
const ShareButton = nextDynamic(() => import("@/components/marketing/ShareButton"));

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getNewsItem = cache(async (id: string) => {
  return supabaseAdmin
    .from("berita")
    .select("*")
    .eq("id", id)
    .not("published_at", "is", null)
    .single();
});

function estimateReadingTime(html: string): number {
  const text = html?.replace(/<[^>]*>/g, " ") || "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function cleanHTML(html: string) {
  if (!html) return "";
  
  // 1. Resolve Middle-Word Breaking Tags (The "Healer")
  let cleaned = html
    .replace(/([a-zA-Z])<br\s*\/?>([a-zA-Z])/g, "$1$2")
    .replace(/([a-zA-Z])<\/p>\s*<p[^>]*>([a-zA-Z])/g, "$1$2")
    .replace(/([a-zA-Z])<\/span>\s*<span[^>]*>([a-zA-Z])/g, "$1$2")
    .replace(/([a-zA-Z])\s*\n\s*([a-zA-Z])/g, "$1$2");

  // 2. Remove invisible characters & soft hyphens
  cleaned = cleaned.replace(/[\u00AD\u200B\u200C\u200D\FEFF]/g, "");

  return cleaned.trim();
}

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data: news } = await getNewsItem(id);
  const title = news?.title || "Berita UPT BLK Wonojati";
  const description = news?.excerpt || "Baca berita selengkapnya.";
  return {
    title, description,
    openGraph: { title: `${title} | UPT BLK Wonojati`, description, type: "article", images: news?.image_url ? [{ url: news.image_url }] : [] }
  };
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [{ data: item, error }, { data: related }] = await Promise.all([
    getNewsItem(id),
    supabaseAdmin.from("berita").select("id, title, excerpt, published_at, category, image_url").not("published_at", "is", null).neq("id", id).limit(3),
  ]);

  if (error || !item) notFound();

  const readingTime = estimateReadingTime(item.content || "");
  const relatedPosts = (related || []).slice(0, 3);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden selection:bg-primary/20 pt-28 md:pt-32 pb-40">
      <style dangerouslySetInnerHTML={{ __html: `
        .article-content {
          font-family: inherit;
        }
        .article-content p {
          margin-bottom: 2rem;
          font-size: 1.125rem;
          line-height: 1.85;
          color: #334155;
        }
        .article-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
        }
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }
        .article-content ul, .article-content ol {
          margin-bottom: 2rem;
          padding-left: 1.5rem;
        }
        .article-content li {
          margin-bottom: 0.75rem;
        }
        .article-content img {
          border-radius: 1.5rem;
          margin: 3rem 0;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
        }
        .article-content blockquote {
          border-left: 4px solid #5ca25a;
          padding-left: 1.5rem;
          font-style: italic;
          color: #475569;
          margin: 3rem 0;
        }
        .article-content, .article-content * {
          word-break: normal !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          hyphens: none !important;
          -webkit-hyphens: none !important;
          word-break: keep-all !important;
        }
      `}} />

      <ReadingProgressBar />

      <div className="container max-w-5xl mx-auto px-6 font-sans">
        {/* Header Breadcrumb */}
        <Link href="/berita" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all mb-8 md:mb-12">
          <ChevronLeft className="w-4 h-4" />
          Katalog Berita
        </Link>

        {/* Categories & Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="px-4 py-1.5 bg-primary text-white text-[9px] font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-primary/20 whitespace-nowrap">
            {item.category || "Berita"}
          </span>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(item.published_at || item.created_at)}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest md:pl-4 md:border-l border-slate-100 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} Menit Baca
          </div>
        </div>

        {/* Title Section */}
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.2] md:leading-[1.1] tracking-tight mb-8 md:mb-12 text-balance">
          {item.title}
        </h1>

        {/* Info Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-y border-slate-100 mb-12 md:mb-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="whitespace-nowrap">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Penulis</p>
              <p className="text-sm font-bold text-slate-900">Admin BLK Wonojati</p>
            </div>
          </div>
          
          <ShareButton />
        </div>

        {/* Featured Image */}
        {item.image_url && (
          <div className="mb-16 md:mb-24">
            <div className="relative aspect-[4/3] md:aspect-[21/9] w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-50 shadow-2xl">
              <Image 
                src={item.image_url} 
                fill 
                className="object-cover" 
                alt={item.title} 
                priority 
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="max-w-3xl mx-auto">
          <article 
            className="article-content" 
            style={{ 
               fontSize: '1.125rem', 
               lineHeight: '1.8',
               color: '#334155'
            }}
            dangerouslySetInnerHTML={{ __html: cleanHTML(item.content || "") }} 
          />
          
          {/* Tags */}
          <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-slate-50">
            <div className="flex flex-wrap items-center gap-2 text-center md:text-left justify-center md:justify-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mr-4">Topic Tags:</span>
              {Array.from(new Set(['Berita', 'Wonojati', item.category].filter(Boolean))).map(tag => (
                <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-24 md:mt-40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Berita Lainnya</h2>
              <Link href="/berita" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                Semua Berita <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Link key={post.id} href={`/berita/${post.id}`} className="group block">
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-slate-50 border border-slate-100">
                    {post.image_url ? (
                      <Image src={post.image_url} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" alt={post.title} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <Newspaper className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Decorative Footer Section */}
      <section className="mt-24 md:mt-40 bg-slate-900 py-20 md:py-32 rounded-[2rem] md:rounded-[4rem] mx-2 md:mx-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#5ca25a20,transparent_50%)]" />
        <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Eksplorasi Keahlian Anda</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-medium">Temukan pelatihan yang tepat untuk jenjang karir Anda di UPT BLK Wonojati.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <ButtonPremium href="/kejuruan-pelatihan" size="lg">Lihat Kejuruan</ButtonPremium>
            <ButtonPremium href="/bantuan" variant="outline" size="lg">Hubungi Admin</ButtonPremium>
          </div>
        </div>
      </section>
    </main>
  );
}
