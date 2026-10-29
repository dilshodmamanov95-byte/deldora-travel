import { listContent } from '@/lib/content-store'
import { internationalTours } from '@/data/internationalTours'
import { domesticTours } from '@/data/domesticTours'

export async function getInternationalTours() {
  try {
    const stored = await listContent('international-tours')
    return stored.length ? stored as typeof internationalTours : internationalTours
  } catch {
    return internationalTours
  }
}

export async function getDomesticTours() {
  try {
    const stored = await listContent('domestic-tours')
    return stored.length ? stored as typeof domesticTours : domesticTours
  } catch {
    return domesticTours
  }
}
