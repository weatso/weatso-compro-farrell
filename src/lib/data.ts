export const proprietaryProjects = [
  {
    name: 'Anugerah Ventures',
    tag: 'Corporate Investment Platform',
    tagId: 'Platform Investasi Korporat',
    image: '/images/thumbnail-anugerah.webp',
    url: 'https://anugerahventures.com',
  },
  {
    name: 'Laddify',
    tag: 'SaaS Growth Platform',
    tagId: 'Platform Pertumbuhan SaaS',
    image: '/images/thumbnail-laddify.webp',
    url: '#',
  },
  {
    name: 'Evory',
    tag: 'Digital Wedding Ecosystem',
    tagId: 'Ekosistem Pernikahan Digital',
    image: '/images/thumbnail-evory.png',
    url: 'https://evory.id',
  },
  {
    name: 'Lokal',
    tag: 'Local Commerce Platform',
    tagId: 'Platform Perdagangan Lokal',
    image: '/images/thumbnail-lokal.webp',
    url: 'https://pakalilokal.com',
  },
]

export const clientProjects = [
  {
    name: 'Radeva',
    tag: 'Wedding Organizer',
    tagId: 'Wedding Organizer',
    image: '/images/thumbnail-radeva.webp',
    url: 'https://radeva-landing-page.vercel.app/',
  },
  {
    name: 'WeThinkParty',
    tag: 'Event Organizer',
    tagId: 'Event Organizer',
    image: '/images/thumbnail-wtp.png',
    url: 'https://wtp-landing-page-linktree-farrell.vercel.app/',
  },
  {
    name: 'UD Dokar',
    tag: 'Printing & Packaging',
    tagId: 'Percetakan & Kemasan',
    image: '/images/thumbnail-dokar.webp',
    url: 'https://uddokar.vercel.app/login',
  },
  {
    name: 'Tangwin Cut',
    tag: 'Barbershop',
    tagId: 'Barbershop',
    image: '/images/thumbnail-tangwin.png',
    url: '#',
  },
]

export const allProjects = [...clientProjects, ...proprietaryProjects].map((p) => ({
  ...p,
  archDesc: 'Full-stack architecture built on Next.js, PostgreSQL, and Redis cache layer. Microservices deployed via Docker on managed Kubernetes cluster with auto-scaling policies.',
  techStack: 'Next.js · TypeScript · PostgreSQL · Redis · Docker · Kubernetes',
  link: p.url || '#',
}))
