import type { ProductContent } from '@/lib/schema';
import { getCategory } from '@/lib/content';
import { ProductCard } from './ProductCard';

/** 3-up desktop, 2-up tablet, 1-up mobile. CSS Grid with minmax(0, 1fr). */
export function ProductGrid({
  products,
  showCategory = false,
  headingLevel = 3,
}: {
  products: ProductContent[];
  showCategory?: boolean;
  headingLevel?: 2 | 3;
}) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]">
      {products.map((p, n) => (
        <li key={p.slug} data-reveal style={{ '--i': n % 3 } as React.CSSProperties}>
          <ProductCard
            href={`/products/${p.slug}`}
            name={p.name}
            summary={p.descriptor}
            range={p.range}
            image={p.images.find((i) => i.slot === 'hero')}
            label={showCategory ? getCategory(p.category)?.name : undefined}
            headingLevel={headingLevel}
          />
        </li>
      ))}
    </ul>
  );
}
