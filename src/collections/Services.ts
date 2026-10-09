import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
    group: 'Content',
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Used in the page URL: /services/your-slug. Leave blank to generate from the title.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => slugify(typeof value === 'string' && value ? value : data?.title || ''),
        ],
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'One or two sentences shown on cards and in search results.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Full description for the service page. Separate paragraphs with a blank line.',
      },
    },
    {
      name: 'priceFrom',
      type: 'text',
      admin: {
        description: 'Optional starting price, e.g. "$350".',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      labels: { singular: 'Highlight', plural: 'Highlights' },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          maxLength: 60,
          admin: { description: 'Overrides the page title in search results.' },
        },
        {
          name: 'description',
          type: 'textarea',
          maxLength: 160,
          admin: { description: 'Overrides the summary in search results.' },
        },
      ],
    },
  ],
}
