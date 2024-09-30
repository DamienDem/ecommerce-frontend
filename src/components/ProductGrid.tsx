"use client";
import React, { useContext } from "react";
import { ProductsContext } from './contexts/Products';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

const ProductGrid = () => {
  const { filteredProducts } = useContext(ProductsContext);

  if (!filteredProducts || filteredProducts.length === 0) {
    return <div>Aucun produit trouvé</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <Card key={product.id}>
          <Link href={`/product/${product.id}`}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                width={250}
                height={250}
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <p className="text-2xl font-bold">{product.price.toFixed(2)} €</p>
              <p className="text-sm min-h-11 text-gray-500 mt-2">
                {product.description}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                En stock: {product.stock}
              </p>
            </CardContent>
          </Link>
          <CardFooter className="flex justify-center">
            <AddToCartButton product={product} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;