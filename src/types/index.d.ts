// product.model.ts
export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
  }
  
  // user.model.ts
  export class User {
    id: number;
    username: string;
    email: string;
    password: string; // Assurez-vous de hacher ce mot de passe avant de le stocker
  }
  
  // order.model.ts
  export class Order {
    id: number;
    userId: number;
    products: { productId: number; quantity: number }[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    createdAt: Date;
  }