export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isDeal?: boolean;
  tags: string[];
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  addedAt: string;
}

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  isAdmin: boolean;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  type: "home" | "work" | "other";
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  totalAmount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  ratings: number[];
  discount: boolean;
  inStock: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  buttonText?: string;
  isActive: boolean;
  order: number;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
  validUntil: string;
  products: Product[];
}
