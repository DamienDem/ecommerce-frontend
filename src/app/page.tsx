//src/app/page.tsx
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
      <div>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold my-8">Nos produits</h1>
          <ProductGrid />
        </div>
      </div>
  );
}
