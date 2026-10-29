import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import path from 'path'

const Users = {
  slug: 'users', auth: true,
  access: { read: ({ req }: any) => Boolean(req.user) },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'select', required: true, defaultValue: 'editor', options: ['admin', 'editor'] },
  ],
}

const priceFields = [
  { name: 'UZS', type: 'number', required: true, defaultValue: 0 },
  { name: 'USD', type: 'number', required: true, defaultValue: 0 },
  { name: 'EUR', type: 'number', required: true, defaultValue: 0 },
]

const localizedTextFields = (name: string) => ({
  name: `${name}Translations`, type: 'group', fields: [
    { name: 'ru', type: name === 'description' || name === 'shortDescription' ? 'textarea' : 'text' },
    { name: 'uz', type: name === 'description' || name === 'shortDescription' ? 'textarea' : 'text' },
    { name: 'en', type: name === 'description' || name === 'shortDescription' ? 'textarea' : 'text' },
  ],
})

const Tour = (slug: string) => ({
  slug,
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'country', 'status'] },
  fields: [
    { name: 'title', type: 'text', required: true }, localizedTextFields('title'),
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'destination', type: 'text', required: true }, localizedTextFields('destination'),
    { name: 'country', type: 'text' }, localizedTextFields('country'),
    { name: 'region', type: 'text' }, localizedTextFields('region'),
    { name: 'duration', type: 'number', required: true },
    { name: 'price', type: 'group', fields: priceFields },
    { name: 'thumbnail', type: 'text' },
    { name: 'images', type: 'array', fields: [{ name: 'url', type: 'text', required: true }] },
    { name: 'description', type: 'textarea' }, localizedTextFields('description'),
    { name: 'shortDescription', type: 'text' }, localizedTextFields('shortDescription'),
    { name: 'rating', type: 'number', defaultValue: 0 },
    { name: 'bookings', type: 'number', defaultValue: 0 },
    { name: 'isPopular', type: 'checkbox', defaultValue: false },
    { name: 'isHot', type: 'checkbox', defaultValue: false },
    { name: 'isNew', type: 'checkbox', defaultValue: false },
    { name: 'status', type: 'select', defaultValue: 'draft', options: ['draft', 'published', 'archived'] },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
  ],
})

const BlogPost = {
  slug: 'blog-posts',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'author', 'status', 'publishedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText' },
    { name: 'image', type: 'text' },
    { name: 'author', type: 'text' },
    { name: 'publishedAt', type: 'date' },
    { name: 'status', type: 'select', defaultValue: 'draft', options: ['draft', 'published'] },
    { name: 'views', type: 'number', defaultValue: 0 },
  ],
}

const SiteSettings = {
  slug: 'site-settings', access: { read: () => true },
  fields: [
    { name: 'siteTitle', type: 'text' },
    { name: 'siteDescription', type: 'textarea' },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'address', type: 'text' },
    { name: 'telegram', type: 'text' },
    { name: 'instagram', type: 'text' },
    { name: 'whatsapp', type: 'text' },
  ],
}

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'deldora-development-secret-change-me-32',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: { user: 'users', meta: { titleSuffix: '- Deldora CMS' } },
  db: sqliteAdapter({ client: { url: process.env.TURSO_DATABASE_URL || `file:${path.join(process.cwd(), 'payload.db')}`, authToken: process.env.TURSO_AUTH_TOKEN } }),
  collections: [Users, Tour('international-tours'), Tour('domestic-tours'), BlogPost, SiteSettings as any],
  typescript: { outputFile: path.resolve(process.cwd(), 'payload-types.ts') },
})
