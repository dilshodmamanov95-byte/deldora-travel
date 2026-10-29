import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, verifySession } from '@/lib/session'
import { saveContent } from '@/lib/content-store'
import { internationalTours } from '@/data/internationalTours'
import { domesticTours } from '@/data/domesticTours'

export async function POST(request: NextRequest) {
  try { if (!verifySession(request.cookies.get(COOKIE_NAME)?.value)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  for (const tour of internationalTours) await saveContent('international-tours', tour.id, { ...tour, status: 'published' })
  for (const tour of domesticTours) await saveContent('domestic-tours', tour.id, { ...tour, status: 'published' })
  const blogPosts = [
    { id: 'best-time-to-visit-uzbekistan', title: 'Лучшее время для посещения Узбекистана', excerpt: 'Когда лучше всего ехать в Узбекистан.', status: 'published', author: 'Гульнара Юлдашева' },
    { id: 'top-10-places-in-tashkent', title: 'Топ 10 мест Ташкентa', excerpt: 'Самые интересные места столицы.', status: 'published', author: 'Ильхом Таджибаев' },
    { id: 'history-of-samarkand', title: 'История Самарканда', excerpt: 'Богатая история древнего города.', status: 'draft', author: 'Рустам Усманов' },
  ]
  for (const post of blogPosts) await saveContent('blog-posts', post.id, post)
  return NextResponse.json({ international: internationalTours.length, domestic: domesticTours.length, blog: blogPosts.length })
}
