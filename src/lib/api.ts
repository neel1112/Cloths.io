import {
  Product,
  Category,
  Order,
  Review,
  Deal,
  Banner,
  FilterOptions,
} from "@/types";
import { products, categories, reviews, deals, banners } from "@/data/mockData";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Product APIs
  async getProducts(params?: {
    category?: string;
    subcategory?: string;
    search?: string;
    sort?: string;
    filters?: Partial<FilterOptions>;
    page?: number;
    limit?: number;
  }) {
    await delay(300);

    let filteredProducts = [...products];

    // Apply category filter
    if (params?.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === params.category,
      );
    }

    // Apply subcategory filter
    if (params?.subcategory) {
      filteredProducts = filteredProducts.filter(
        (p) => p.subcategory === params.subcategory,
      );
    }

    // Apply search filter
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      );
    }

    // Apply filters
    if (params?.filters) {
      const { brands, sizes, colors, priceRange, ratings, discount, inStock } =
        params.filters;

      if (brands && brands.length > 0) {
        filteredProducts = filteredProducts.filter((p) =>
          brands.includes(p.brand),
        );
      }

      if (sizes && sizes.length > 0) {
        filteredProducts = filteredProducts.filter((p) =>
          p.sizes.some((size) => sizes.includes(size)),
        );
      }

      if (colors && colors.length > 0) {
        filteredProducts = filteredProducts.filter((p) =>
          p.colors.some((color) => colors.includes(color)),
        );
      }

      if (priceRange) {
        filteredProducts = filteredProducts.filter(
          (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
        );
      }

      if (ratings && ratings.length > 0) {
        const minRating = Math.min(...ratings);
        filteredProducts = filteredProducts.filter(
          (p) => p.rating >= minRating,
        );
      }

      if (discount) {
        filteredProducts = filteredProducts.filter(
          (p) => p.discount && p.discount > 0,
        );
      }

      if (inStock) {
        filteredProducts = filteredProducts.filter((p) => p.inStock);
      }
    }

    // Apply sorting
    if (params?.sort) {
      switch (params.sort) {
        case "price-low-high":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-high-low":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          filteredProducts.sort(
            (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
          );
          break;
        case "discount":
          filteredProducts.sort(
            (a, b) => (b.discount || 0) - (a.discount || 0),
          );
          break;
        case "popularity":
        default:
          filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    }

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit),
      hasNext: endIndex < filteredProducts.length,
      hasPrev: page > 1,
    };
  },

  async getProduct(id: string): Promise<Product | null> {
    await delay(200);
    return products.find((p) => p.id === id) || null;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await delay(200);
    return products.filter((p) => p.isTrending || p.isNew).slice(0, 8);
  },

  async getTrendingProducts(): Promise<Product[]> {
    await delay(200);
    return products.filter((p) => p.isTrending).slice(0, 6);
  },

  async getDealsProducts(): Promise<Product[]> {
    await delay(200);
    return products.filter((p) => p.isDeal).slice(0, 6);
  },

  async getNewArrivals(): Promise<Product[]> {
    await delay(200);
    return products.filter((p) => p.isNew).slice(0, 6);
  },

  // Category APIs
  async getCategories(): Promise<Category[]> {
    await delay(100);
    return categories;
  },

  async getCategory(slug: string): Promise<Category | null> {
    await delay(100);
    return categories.find((c) => c.slug === slug) || null;
  },

  // Review APIs
  async getProductReviews(productId: string): Promise<Review[]> {
    await delay(200);
    return reviews.filter((r) => r.productId === productId);
  },

  async addReview(
    review: Omit<Review, "id" | "date" | "helpful">,
  ): Promise<Review> {
    await delay(300);
    const newReview: Review = {
      ...review,
      id: `review_${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };
    return newReview;
  },

  // Deal APIs
  async getDeals(): Promise<Deal[]> {
    await delay(200);
    return deals;
  },

  // Banner APIs
  async getBanners(): Promise<Banner[]> {
    await delay(100);
    return banners.filter((b) => b.isActive);
  },

  // Search API
  async searchProducts(query: string): Promise<Product[]> {
    await delay(300);
    const searchTerm = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      )
      .slice(0, 10);
  },

  // Order APIs
  async createOrder(
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt">,
  ): Promise<Order> {
    await delay(500);
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };
    return newOrder;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    await delay(300);
    // Mock implementation - in real app, this would fetch from backend
    return [];
  },

  // Filter options API
  async getFilterOptions(category?: string): Promise<FilterOptions> {
    await delay(200);

    let relevantProducts = products;
    if (category) {
      relevantProducts = products.filter((p) => p.category === category);
    }

    const brands = [...new Set(relevantProducts.map((p) => p.brand))];
    const sizes = [...new Set(relevantProducts.flatMap((p) => p.sizes))];
    const colors = [...new Set(relevantProducts.flatMap((p) => p.colors))];
    const prices = relevantProducts.map((p) => p.price);
    const priceRange: [number, number] = [
      Math.min(...prices),
      Math.max(...prices),
    ];
    const ratings = [5, 4, 3, 2, 1];

    return {
      categories: categories.map((c) => c.name),
      brands,
      sizes,
      colors,
      priceRange,
      ratings,
      discount: true,
      inStock: true,
    };
  },
};
