import { defineField, defineType } from 'sanity'

export const blockStatsType = defineType({
  name: 'blockStats',
  title: 'Blok Statistik',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Section (Opsional)',
      type: 'string',
    }),
    defineField({
      name: 'statsItems',
      title: 'Item Statistik',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({
              name: 'value',
              title: 'Nilai (contoh: 93K)',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Label (contoh: Members registered)',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title ?? 'Blok Statistik', subtitle: 'Angka & Data' }
    },
  },
})
