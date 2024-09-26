"use client";
// components/Products.tsx
import React, { useState, useCallback } from 'react';
import { Product } from "@/types";

interface ProductsProps {
  initialProducts: Product[];
  children: React.ReactNode;
}

export const ProductsContext = React.createContext<{
  products: Product[];
  filteredProducts: Product[];
  handleSearch: (term: string) => void;
}>({
  products: [],
  filteredProducts: [],
  handleSearch: () => {},
});

const Products: React.FC<ProductsProps> = ({ initialProducts, children }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

  const handleSearch = useCallback((term: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);

  return (
    <ProductsContext.Provider value={{ products, filteredProducts, handleSearch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default Products;