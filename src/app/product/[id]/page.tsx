import { ProductDetail } from "@/components/ProductDetail";
import { getProductById } from "@/lib/products";


export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(parseInt(params.id));

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  return <ProductDetail product={product} />;
}