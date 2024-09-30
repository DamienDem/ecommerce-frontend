"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Product } from "@/types";

interface CartItem extends Product {
  quantity: number;
}

interface ProductsProps {
  initialProducts: Product[];
  children: React.ReactNode;
}

interface ProductsContextType {
  products: Product[];
  filteredProducts: Product[];
  cartItems: CartItem[];
  handleSearch: (term: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  isInCart: (productId: number) => boolean;
  getCartItemQuantity: (productId: number) => number;
}

export const ProductsContext = React.createContext<ProductsContextType>({
  products: [],
  filteredProducts: [],
  cartItems: [],
  handleSearch: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  isInCart: () => false,
  getCartItemQuantity: () => 0,
});

const Products: React.FC<ProductsProps> = ({ initialProducts, children }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleSearch = useCallback((term: string) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const updateCartItemQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.min(Math.max(quantity, 0), item.stock) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const isInCart = useCallback((productId: number) => {
    return cartItems.some((item) => item.id === productId);
  }, [cartItems]);

  const getCartItemQuantity = useCallback((productId: number) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  const contextValue = useMemo<ProductsContextType>(
    () => ({
      products,
      filteredProducts,
      cartItems,
      handleSearch,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      isInCart,
      getCartItemQuantity,
    }),
    [products, filteredProducts, cartItems, handleSearch, addToCart, removeFromCart, updateCartItemQuantity, isInCart, getCartItemQuantity]
  );

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export default Products;