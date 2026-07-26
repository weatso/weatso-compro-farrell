import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { ALL_PORTFOLIOS_QUERY } from '@/sanity/lib/queries'
import PortfolioShowcase, { type PortfolioProject } from '@/components/portofolio/portfolio-showcase'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Portofolio projek digital WEATSO — arsitektur ekosistem, platform commerce, hingga sistem operasional kustom.',
}

interface PortfolioRaw {
  _id: string
  title: string
  client?: string
  industry?: string
  slug?: { current: string } | null
  image?: Parameters<typeof urlFor>[0] | null
}

export default async function PortofolioListPage() {
  const raw: PortfolioRaw[] = await client.fetch(ALL_PORTFOLIOS_QUERY)

  const projects: PortfolioProject[] = raw.map((item) => ({
    _id: item._id,
    title: item.title,
    client: item.client,
    industry: item.industry,
    slug: item.slug?.current ?? null,
    imageUrl: item.image ? urlFor(item.image).width(800).height(1000).fit('crop').url() : null,
  }))

  return <PortfolioShowcase projects={projects} />
}
