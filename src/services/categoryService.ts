import { categorySeed } from '../data/categories'
import { getImage } from '../lib/images'
import type { Category } from '../types/category'
import { simulateNetwork } from './simulateNetwork'

export async function getAllCategories(): Promise<Category[]> {
  await simulateNetwork()
  return categorySeed.map((category) => ({ ...category, image: getImage(category.image) }))
}