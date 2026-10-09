import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { dietaryTags, menuCategories } from '../lib/options'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'order'],
    group: 'Content',
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [...menuCategories],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'dietary',
      type: 'select',
      hasMany: true,
      options: [...dietaryTags],
    },
    {
      name: 'price',
      type: 'text',
      admin: {
        description: 'Optional, e.g. "$4 per guest".',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first within a category.',
      },
    },
  ],
}
