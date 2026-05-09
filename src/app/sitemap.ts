import { MetadataRoute } from 'next'
import { supabaseAdmin } from "@/lib/supabase-admin"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blkwonojati.site'

  // Parallel fetch for jobs and news
  const [{ data: jobs }, { data: news }] = await Promise.all([
    supabaseAdmin
      .from('lowongan_kerja')
      .select('id, updated_at')
      .eq('is_active', true),
    supabaseAdmin
      .from('berita')
      .select('id, published_at')
      .not('published_at', 'is', null)
  ])

  const jobUrls = (jobs || []).map((job) => ({
    url: `${baseUrl}/lowongan-kerja/${job.id}`,
    lastModified: new Date(job.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const newsUrls = (news || []).map((item) => ({
    url: `${baseUrl}/berita/${item.id}`,
    lastModified: new Date(item.published_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/profil`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kejuruan-pelatihan`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lowongan-kerja`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/galeri`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/bantuan`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]

  return [...staticPages, ...jobUrls, ...newsUrls]
}
