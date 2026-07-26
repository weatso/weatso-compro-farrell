import { defineField, defineType } from 'sanity'

export const blockImageTextType = defineType({
  name: 'blockImageText',
  title: 'Blok Gambar + Teks',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Gambar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'imagePosition',
      title: 'Posisi Gambar',
      type: 'string',
      options: {
        list: [
          { title: 'Kiri', value: 'left' },
          { title: 'Kanan', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
    prepare({ title, media }) {
      return { title: title ?? 'Blok Gambar + Teks', subtitle: 'Gambar + Teks', media }
    },
  },
})
