"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Newspaper, ArrowRight } from "lucide-react";

interface BeritaItem {
  id: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  category: string;
  published_at: string | null;
  created_at: string;
}

interface BeritaClientProps {
  hero: BeritaItem;
  rest: BeritaItem[];
  categories: string[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as any },
  }),
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm animate-pulse">
      <div className="aspect-video bg-slate-100" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-20 bg-slate-100 rounded-full" />
        <div className="h-5 w-full bg-slate-100 rounded-full" />
        <div className="h-5 w-3/4 bg-slate-100 rounded-full" />
        <div className="h-3 w-full bg-slate-100 rounded-full" />
        <div className="h-3 w-2/3 bg-slate-100 rounded-full" />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function BeritaClient({ hero, rest, categories }: BeritaClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const allArticles = useMemo(() => [hero, ...rest], [hero, rest]);

  const filtered = useMemo(() => {
    let result = allArticles;
    if (activeCategory !== "Semua") {
      result = result.filter((n) => n.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title?.toLowerCase().includes(q) ||
          n.excerpt?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allArticles, activeCategory, searchQuery]);

  const isFiltering = searchQuery.trim() || activeCategory !== "Semua";
  const displayHero = !isFiltering;
  const displayRest = isFiltering ? filtered : filtered.slice(1);
  const heroArticle = !isFiltering ? filtered[0] ?? hero : null;

  return (
    <div>
      {/* ─── Search + Filter Bar ─────────────────────────────────────────── */}
      <div className="mb-10 space-y-4">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berita atau artikel..."
            className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
          />
        </div>
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {["Semua", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${activeCategory === cat
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-primary/40 hover:text-primary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Hero Section (only when not filtering) ────────────────────── */}
      {displayHero && heroArticle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <Link href={`/berita/${heroArticle.id}`} className="group block">
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden bg-slate-100 shadow-xl">
              {heroArticle.image_url ? (
                <Image
                  src={heroArticle.image_url}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={heroArticle.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Newspaper className="w-16 h-16" />
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {heroArticle.category || "Berita"}
                  </span>
                  <span className="text-white/60 text-xs font-medium">
                    {formatDate(heroArticle.published_at || heroArticle.created_at)}
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl group-hover:text-primary-foreground transition-colors mb-3">
                  {heroArticle.title}
                </h2>
                <p className="text-white/70 text-sm md:text-base line-clamp-2 max-w-2xl">
                  {heroArticle.excerpt}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-white text-sm font-bold group-hover:gap-3 transition-all">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* ─── Article Grid ───────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRest.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Link href={`/berita/${item.id}`} className="group block h-full">
                <article className="h-full bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        alt={item.title}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <Newspaper className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-md">
                        {item.category || "Berita"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {formatDate(item.published_at || item.created_at)}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                      {item.excerpt || "Baca selengkapnya..."}
                    </p>
                    <div className="mt-4 text-xs font-bold flex items-center gap-1.5 text-slate-400 group-hover:text-primary transition-colors">
                      Baca <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <Newspaper className="w-10 h-10 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900">Tidak Ada Hasil</h3>
          <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">
            {searchQuery
              ? `Tidak ditemukan artikel untuk "${searchQuery}".`
              : "Belum ada artikel di kategori ini."}
          </p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("Semua"); }}
            className="mt-4 text-primary text-sm font-bold hover:underline"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
