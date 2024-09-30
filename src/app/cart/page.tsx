"use client";
import React, { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from 'next/link';
import { ProductsContext } from '@/components/contexts/Products';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(ProductsContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Votre panier</h1>
        <Link href="/" passHref>
          <Button variant="outline">Continuer vos achats</Button>
        </Link>
      </div>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="object-cover mr-4" />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.price.toFixed(2)} €</p>
                </div>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                  className="w-20 mr-4"
                />
                <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <p className="text-2xl font-bold">Total: {total.toFixed(2)} €</p>
            <Button className="mt-4">Passer la commande</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;