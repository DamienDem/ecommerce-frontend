"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, UserCircle } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ProductsContext } from './contexts/Products';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';


const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const { products, handleSearch, cartItems } = React.useContext(ProductsContext);
  const { user, loading } = useAuth();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">E-Commerce</Link>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[300px] justify-start">
                <Search className="mr-2 h-4 w-4" />
                {searchTerm || "Rechercher un produit..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onValueChange={(value) => {
                    setSearchTerm(value);
                    handleSearch(value);
                    setOpen(true);
                  }}
                />
                <CommandList>
                  <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                  <CommandGroup>
                    {products
                      .filter(product =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .slice(0, 5)
                      .map(product => (
                        <CommandItem
                          key={product.id}
                          onSelect={() => {
                            setSearchTerm(product.name);
                            handleSearch(product.name);
                            setOpen(false);
                          }}
                        >
                          {product.name}
                        </CommandItem>
                      ))
                    }
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex items-center space-x-4">
            {loading ? (
              <div>Chargement...</div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <span>Bonjour {user.displayName?.split(' ')[0] || 'Utilisateur'}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Link href="/sign-in" passHref>
                <Button variant="outline" size="sm" className="flex items-center">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Connexion / Inscription
                </Button>
              </Link>
            )}
            <Link href="/cart" passHref>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;