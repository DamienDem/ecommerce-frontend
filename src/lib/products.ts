
import { products } from "@/constants/product";
import { Product } from "@/types";


export async function getProductById(id: number): Promise<Product | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return products.find(product => product.id === id);
}