"use client";

import React, { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "@/types";
import { ProductsContext } from "./contexts/Products";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, updateCartItemQuantity, removeFromCart, cartItems } =
    useContext(ProductsContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    addToCart(product);
    setQuantity(1);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= product.stock) {
      if (newQuantity === 0) {
        removeFromCart(product.id);
      } else {
        updateCartItemQuantity(product.id, newQuantity);
      }
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {quantity > 0 ? (
        <>
          <Button
            onClick={() => handleUpdateQuantity(quantity - 1)}
            disabled={quantity === 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value);
              if (!isNaN(newQuantity) && newQuantity >= 1) {
                handleUpdateQuantity(newQuantity);
              }
            }}
            className="w-20 text-center"
          />
          <Button
            onClick={() => handleUpdateQuantity(quantity + 1)}
            disabled={quantity === product.stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeFromCart(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <Button onClick={handleAddToCart}>Ajouter au panier</Button>
      )}
    </div>
  );
};

export default AddToCartButton;
