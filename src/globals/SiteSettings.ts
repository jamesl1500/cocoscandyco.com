import type { GlobalConfig } from 'payload'

import { revalidateGlobalAfterChange } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      name: 'businessName',
      type: 'text',
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Short phrase shown next to the name in search results.' },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 160,
      admin: { description: 'Default description for search results and link previews.' },
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'serviceArea',
      type: 'text',
      admin: { description: 'Where you cater, e.g. "Austin and the Texas Hill Country".' },
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'region', type: 'text', label: 'State / region' },
        { name: 'postalCode', type: 'text' },
        { name: 'country', type: 'text', admin: { description: 'Two-letter code, e.g. "US".' } },
      ],
    },
    {
      name: 'hours',
      type: 'array',
      labels: { singular: 'Hours row', plural: 'Hours' },
      fields: [
        { name: 'days', type: 'text', required: true, admin: { description: 'e.g. "Mon–Fri"' } },
        { name: 'hours', type: 'text', required: true, admin: { description: 'e.g. "9am–5pm"' } },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'tiktok', type: 'text', label: 'TikTok URL' },
      ],
    },
  ],
}
