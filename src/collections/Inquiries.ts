import type { CollectionConfig } from 'payload'

import { eventTypes } from '../lib/options'

// Quote requests from the contact form. No public access: the form's server action
// writes through the Local API, and only logged-in admins can read or edit.
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Inquiry', plural: 'Inquiries' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'eventType', 'eventDate', 'status', 'createdAt'],
    group: 'Leads',
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Booked', value: 'booked' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'eventType',
      type: 'select',
      options: [...eventTypes],
    },
    {
      name: 'eventDate',
      type: 'date',
    },
    {
      name: 'guestCount',
      type: 'number',
      min: 1,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
