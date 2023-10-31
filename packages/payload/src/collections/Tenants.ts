import { CollectionConfig } from 'payload/types'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  labels: { singular: '△ Tenant', plural: '△ Tenants' },
  admin: { group: 'Admin', useAsTitle: 'name' },
  fields: [
    { type: 'text', name: 'name', required: true },
  ],
}