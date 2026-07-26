import {defineField, defineType} from 'sanity'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portofolio WEATSO',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Judul Projek', type: 'string' }),
    defineField({ 
      name: 'slug', 
      title: 'URL Projek (Slug)', 
      type: 'slug', 
      options: { source: 'title', maxLength: 96 } 
    }),
    defineField({ name: 'client', title: 'Nama Klien', type: 'string' }),
    defineField({ name: 'industry', title: 'Industri', type: 'string' }),
    defineField({ name: 'image', title: 'Gambar Utama', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'contentBlocks',
      title: 'Bongkar Pasang Konten (Page Builder)',
      type: 'array',
      of: [
        { type: 'blockText' },
        { type: 'blockImageText' },
        { type: 'blockStats' },
      ],
    }),
  ],
})
