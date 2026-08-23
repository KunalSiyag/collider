import type { ElementCategory } from './registry';

export function categorySlug(category: ElementCategory): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function categoryPath(category: ElementCategory): string {
  return `/elements/category/${categorySlug(category)}`;
}
