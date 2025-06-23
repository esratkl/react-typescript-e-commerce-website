export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  brand?: string; 
  color?: string;
  description?: string;
  count?: number;
  rating?: number;
  reviewCount?: number; 
}
