import { defineField, defineType } from 'sanity'

export const blockTextType = defineType({
  name: 'blockText',
  title: 'Blok Teks',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Judul',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 5,
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title ?? 'Blok Teks', subtitle: 'Teks' }
    },
  },
})
