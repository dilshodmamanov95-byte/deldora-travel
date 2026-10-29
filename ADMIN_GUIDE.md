# Deldora Travel - Admin Panel Guide

## 🔐 Authentication

### Default Credentials
- **Email**: `admin@deldora.travel`
- **Password**: `deldora2024`

### How to Change Password
Currently, the password is stored in localStorage. For production, it's recommended to:

1. Set environment variables in `.env.local`:
```
NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
```

2. Restart the development server

## 📊 Dashboard

The admin dashboard displays:
- Total number of tours
- Number of international tours
- Number of domestic tours
- Total revenue (calculated from tour prices and bookings)
- Total bookings
- Popular tours (sorted by booking count)

## 🌍 Tours Management

### Viewing Tours
- All tours are loaded from static data files (`src/data/internationalTours.ts` and `src/data/domesticTours.ts`)
- Tours are displayed in a table format with filtering and search capabilities

### Tour Fields
Each tour can have the following fields:
- **Basic Info**: ID, Title, Slug, Destination, Country/Region, Duration
- **Pricing**: Price (USD, EUR, UZS), Old Price (optional)
- **Description**: Short and full descriptions
- **Media**: Thumbnail, Images gallery
- **Metadata**: Rating, Review Count, Difficulty, Tour Type, Season
- **Details**: Itinerary, Included/Excluded services, Highlights, Best For
- **Status**: Is Popular, Is Hot Deal, Is New
- **SEO**: Tags
- **Stats**: Bookings count

### Editing Tours
To edit tours:
1. Go to `/admin/tours` for international tours
2. Go to `/admin/tours/domestic` for domestic tours
3. Use the edit interface to modify tour details

**Note**: Currently, changes are made to static files. For a production system, consider implementing:
- A proper database (Turso, PostgreSQL, MongoDB)
- Payload CMS with proper configuration
- Or a custom API for managing tours

## ✍️ Blog Management

Manage blog posts at `/admin/blog`:
- Create new articles
- Edit existing posts
- Categorize and tag posts
- Set featured images
- Manage publication dates

## ⚙️ Settings

Manage site settings at `/admin/settings`:
- Site title and description
- Logo and favicon
- Contact information (email, phone, address)
- Social media links (Telegram, WhatsApp, Instagram, Facebook)
- Currency exchange rates

## 🎨 Customization

### Adding New Fields
To add new fields to tours or other collections:

1. Update the TypeScript interface in the respective data file
2. Add the field to the admin interface
3. Update any components that display the data

### Styling
The admin panel uses:
- Tailwind CSS for styling
- Custom dark theme with slate and gold colors
- Glassmorphism effects on cards
- Smooth transitions and hover effects

## 🚀 Production Setup

### Environment Variables
```
NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

### Recommended for Production
1. **Database**: Set up Turso (SQLite) or PostgreSQL
2. **Authentication**: Implement proper session management with JWT or NextAuth.js
3. **Security**: 
   - Use HTTPS
   - Hash passwords properly
   - Implement rate limiting
   - Use CSRF protection
4. **Backup**: Regularly backup your data

### Using Payload CMS (Alternative)

To use Payload CMS instead of static files:

1. Install required packages:
```bash
npm install payload @payloadcms/db-sqlite @payloadcms/richtext-slate
```

2. Create configuration in `src/payload/payload.config.ts`

3. Set up middleware for authentication

4. Update all admin pages to use Payload API

## 📁 File Structure

```
/src/app/admin/
  ├── layout.tsx          # Admin layout with sidebar
  ├── page.tsx            # Dashboard
  ├── login/
  │   └── page.tsx        # Login page
  ├── tours/
  │   ├── page.tsx        # International tours
  │   └── domestic/
  │       └── page.tsx    # Domestic tours
  ├── blog/
  │   └── page.tsx        # Blog management
  ├── settings/
  │   └── page.tsx        # Site settings
  └── pages/
      └── page.tsx        # Page management
```

## 💡 Tips

1. **Default Password**: The default password is `deldora2024`. Change it immediately in production!

2. **Data Persistence**: Currently using static files. For production, implement a proper database.

3. **User Roles**: The system supports `admin` and `editor` roles. Admins have full access, editors can manage content.

4. **Local Development**: Run the dev server with `npm run dev`

5. **Build**: Create production build with `npm run build`

## 🎯 Future Enhancements

- [ ] Real-time updates with WebSockets
- [ ] Image upload and management
- [ ] Multi-language support for content
- [ ] User management (create/edit/delete users)
- [ ] Booking management
- [ ] Analytics and reporting
- [ ] Email notifications
- [ ] API integration with external services

---

**Deldora Travel Admin Panel v1.0**
