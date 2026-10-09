import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'eventType', 'createdAt'],
    group: 'Content',
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'eventType',
      type: 'text',
      admin: {
        description: 'Optional context, e.g. "Wedding, June 2026".',
      },
    },
  ],
}
