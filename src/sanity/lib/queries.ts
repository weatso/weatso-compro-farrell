import { defineQuery } from 'next-sanity'

export const ALL_PORTFOLIOS_QUERY = defineQuery(`
  *[_type == "portfolio"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    client,
    industry,
    image
  }
`)

export const PORTFOLIO_BY_SLUG_QUERY = defineQuery(`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    industry,
    image
  }
`)

export const ALL_PORTFOLIO_SLUGS_QUERY = defineQuery(`
  *[_type == "portfolio" && defined(slug.current)] {
    "slug": slug.current
  }
`)
