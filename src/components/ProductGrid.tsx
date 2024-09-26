"use client";
// components/ProductGrid.tsx
import React, { useContext } from 'react';
import { ProductsContext } from './Products';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ProductGrid: React.FC = () => {
  const { filteredProducts } = useContext(ProductsContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <Card key={product.id}>
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
          <CardFooter>
            <Button className="w-full">Ajouter au panier</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;