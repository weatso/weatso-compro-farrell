 import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'

// ─── Types ────────────────────────────────────────────────────────────────────
type BlockText = {
  _key: string
  _type: 'blockText'
  heading?: string
  description?: string
}

type BlockImageText = {
  _key: string
  _type: 'blockImageText'
  image?: any
  title?: string
  description?: string
  imagePosition?: 'left' | 'right'
}

type StatItem = {
  _key: string
  value?: string
  label?: string
}

type BlockStats = {
  _key: string
  _type: 'blockStats'
  title?: string
  statsItems?: StatItem[]
}

type ContentBlock = BlockText | BlockImageText | BlockStats

// ─── GROQ Queries ─────────────────────────────────────────────────────────────
const PORTOFOLIO_DETAIL_QUERY = defineQuery(`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id,
    title,
    client,
    industry,
    image,
    contentBlocks[] {
      _key,
      _type,
      heading,
      description,
      "image": image { ..., asset-> },
      title,
      imagePosition,
      statsItems[] { _key, value, label }
    }
  }
`)

const PORTOFOLIO_SLUGS_QUERY = defineQuery(`
  *[_type == "portfolio" && defined(slug.current)] { "slug": slug.current }
`)

export async function generateStaticParams() {
  const slugs = await client.fetch(PORTOFOLIO_SLUGS_QUERY)
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch(PORTOFOLIO_DETAIL_QUERY, { slug })
  if (!project) return { title: 'Work | WEATSO' }
  return {
    title: `${project.title} | WEATSO`,
    description: `${project.client ?? ''} — ${project.industry ?? ''} · WEATSO`,
  }
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const BG = '#0C0F1A'
const BORDER = 'rgba(255,255,255,0.07)'
const TEXT_DIM = 'rgba(255,255,255,0.35)'
const TEXT_LABEL = 'rgba(255,255,255,0.22)'

// ─── Block: Text ──────────────────────────────────────────────────────────────
function RenderBlockText({ block }: { block: BlockText }) {
  return (
    <section style={{ padding: '5rem 4rem', maxWidth: '100%' }}>
      <div style={{ maxWidth: '640px' }}>
        {block.heading && (
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            color: '#ffffff',
            marginBottom: '1.5rem',
          }}>
            {block.heading}
          </h2>
        )}
        {block.description && (
          <p style={{
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.9,
            color: TEXT_DIM,
          }}>
            {block.description}
          </p>
        )}
      </div>
    </section>
  )
}

// ─── Block: Image + Text ──────────────────────────────────────────────────────
function RenderBlockImageText({ block }: { block: BlockImageText }) {
  return (
    <section style={{ padding: '4rem', borderTop: `1px solid ${BORDER}` }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: block.imagePosition === 'right' ? '1fr 1fr' : '1fr 1fr',
        gap: '3rem',
        alignItems: 'center',
      }}>
        {block.imagePosition === 'right' ? (
          <>
            {/* Text first */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {block.title && (
                <h3 style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.25,
                  color: '#ffffff',
                }}>
                  {block.title}
                </h3>
              )}
              {block.description && (
                <p style={{ fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.85, color: TEXT_DIM }}>
                  {block.description}
                </p>
              )}
            </div>
            {/* Image */}
            {block.image && (
              <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src={urlFor(block.image).width(1000).url()} alt={block.title ?? ''} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Image first */}
            {block.image && (
              <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src={urlFor(block.image).width(1000).url()} alt={block.title ?? ''} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {block.title && (
                <h3 style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.25,
                  color: '#ffffff',
                }}>
                  {block.title}
                </h3>
              )}
              {block.description && (
                <p style={{ fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.85, color: TEXT_DIM }}>
                  {block.description}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// ─── Block: Stats ─────────────────────────────────────────────────────────────
function RenderBlockStats({ block }: { block: BlockStats }) {
  return (
    <section style={{ padding: '5rem 4rem', borderTop: `1px solid ${BORDER}` }}>
      {block.title && (
        <p style={{
          fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase',
          color: TEXT_LABEL, marginBottom: '3.5rem', fontWeight: 400,
        }}>
          {block.title}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '3rem' }}>
        {block.statsItems?.map((item) => (
          <div key={item._key} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              color: '#ffffff',
            }}>
              {item.value}
            </span>
            <span style={{
              fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: TEXT_LABEL, fontWeight: 400, lineHeight: 1.6,
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block._type) {
    case 'blockText': return <RenderBlockText block={block} />
    case 'blockImageText': return <RenderBlockImageText block={block} />
    case 'blockStats': return <RenderBlockStats block={block} />
    default: return null
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PortofolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await client.fetch(PORTOFOLIO_DETAIL_QUERY, { slug })
  if (!project) notFound()

  return (
    <main style={{ minHeight: '100vh', background: BG, color: '#fff', display: 'flex', flexDirection: 'column' }}>

      {/* ── BACK LINK ─────────────────────────────────────────────── */}
      <div style={{ padding: '7rem 4rem 0' }}>
        <Link href="/portofolio" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          color: TEXT_LABEL, textDecoration: 'none', fontSize: '0.7rem',
          letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 400,
          transition: 'color 0.2s',
        }}>
          ← Work
        </Link>
      </div>

      {/* ── HERO TITLE ────────────────────────────────────────────── */}
      <div style={{ padding: '3rem 4rem 0' }}>
        <p style={{
          fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase',
          color: TEXT_LABEL, marginBottom: '1.5rem', fontWeight: 400,
        }}>
          {project.industry ?? 'Portfolio'}
        </p>
        <h1 style={{
          fontSize: 'clamp(3.5rem, 9vw, 9rem)',
          fontWeight: 700,
          letterSpacing: '-0.045em',
          lineHeight: 0.95,
          color: '#ffffff',
          margin: 0,
        }}>
          {project.title}
        </h1>
      </div>

      {/* ── META BAR ──────────────────────────────────────────────── */}
      <div style={{
        margin: '3rem 4rem 0',
        padding: '2rem 0',
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex',
        gap: '3rem',
        flexWrap: 'wrap',
      }}>
        {project.client && (
          <div>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: TEXT_LABEL, marginBottom: '0.4rem', fontWeight: 400 }}>
              Client
            </p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
              {project.client}
            </p>
          </div>
        )}
        {project.industry && (
          <div>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: TEXT_LABEL, marginBottom: '0.4rem', fontWeight: 400 }}>
              Industry
            </p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
              {project.industry}
            </p>
          </div>
        )}
      </div>

      {/* ── COVER IMAGE ───────────────────────────────────────────── */}
      {project.image && (
        <div style={{ padding: '3rem 4rem' }}>
          <img
            src={urlFor(project.image).width(2000).url()}
            alt={project.title ?? ''}
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      )}

      {/* ── CONTENT BLOCKS ────────────────────────────────────────── */}
      {project.contentBlocks && project.contentBlocks.length > 0 && (
        <div style={{ flex: 1 }}>
          {project.contentBlocks.map((block: ContentBlock) => (
            <RenderBlock key={block._key} block={block} />
          ))}
        </div>
      )}

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <div style={{
        padding: '2.5rem 4rem',
        borderTop: `1px solid ${BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/portofolio" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          color: TEXT_LABEL, textDecoration: 'none', fontSize: '0.7rem',
          letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 400,
        }}>
          ← Back to Work
        </Link>
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)', fontWeight: 400 }}>
          WEATSO
        </span>
      </div>

    </main>
  )
}
