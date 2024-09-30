import Image from "next/image";
import { Product } from "@/types";
import AddToCartButton from "./AddToCartButton";

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">
            {product.price.toFixed(2)} €
          </p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4">En stock: {product.stock}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};
