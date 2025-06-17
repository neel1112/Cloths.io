import { Product, Category, Banner, Deal, Review, User } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Men",
    slug: "men",
    image:
      "https://images.unsplash.com/photo-1516826435551-36a8a09e4526?w=400&h=300&fit=crop",
    subcategories: [
      {
        id: "1",
        name: "T-Shirts",
        slug: "t-shirts",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
      },
      {
        id: "2",
        name: "Jeans",
        slug: "jeans",
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop",
      },
      {
        id: "3",
        name: "Shirts",
        slug: "shirts",
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop",
      },
      {
        id: "4",
        name: "Shoes",
        slug: "shoes",
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop",
      },
    ],
  },
  {
    id: "2",
    name: "Women",
    slug: "women",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
    subcategories: [
      {
        id: "5",
        name: "Dresses",
        slug: "dresses",
        image:
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&h=200&fit=crop",
      },
      {
        id: "6",
        name: "Tops",
        slug: "tops",
        image:
          "https://images.unsplash.com/photo-1564584217132-2271339c9b46?w=200&h=200&fit=crop",
      },
      {
        id: "7",
        name: "Jeans",
        slug: "women-jeans",
        image:
          "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=200&h=200&fit=crop",
      },
      {
        id: "8",
        name: "Kurtis",
        slug: "kurtis",
        image:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&h=200&fit=crop",
      },
      {
        id: "9",
        name: "Ethnic Wear",
        slug: "ethnic-wear",
        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop",
      },
    ],
  },
  {
    id: "3",
    name: "Kids",
    slug: "kids",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=300&fit=crop",
    subcategories: [
      {
        id: "10",
        name: "Boys",
        slug: "boys",
        image:
          "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&h=200&fit=crop",
      },
      {
        id: "11",
        name: "Girls",
        slug: "girls",
        image:
          "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=200&fit=crop",
      },
      {
        id: "12",
        name: "Baby",
        slug: "baby",
        image:
          "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=200&fit=crop",
      },
    ],
  },
];

export const banners: Banner[] = [
  {
    id: "1",
    title: "Summer Sale",
    subtitle: "Up to 70% off on trending fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop",
    link: "/products?sale=true",
    buttonText: "Shop Now",
    isActive: true,
    order: 1,
  },
  {
    id: "2",
    title: "New Arrivals",
    subtitle: "Discover the latest fashion trends",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=500&fit=crop",
    link: "/products?new=true",
    buttonText: "Explore",
    isActive: true,
    order: 2,
  },
  {
    id: "3",
    title: "Ethnic Collection",
    subtitle: "Traditional wear for special occasions",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=500&fit=crop",
    link: "/products?category=ethnic-wear",
    buttonText: "View Collection",
    isActive: true,
    order: 3,
  },
];

export const products: Product[] = [
  // Men's T-Shirts
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    description:
      "Premium quality cotton t-shirt with comfortable fit. Perfect for casual wear.",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    category: "men",
    subcategory: "t-shirts",
    brand: "Urban Fit",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=600&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Gray"],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    isTrending: true,
    tags: ["casual", "cotton", "comfortable"],
  },
  {
    id: "2",
    name: "Graphic Print T-Shirt",
    description: "Trendy graphic print t-shirt made from soft cotton blend.",
    price: 24.99,
    category: "men",
    subcategory: "t-shirts",
    brand: "Style Co",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f37f4ec6?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Red"],
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    isNew: true,
    tags: ["graphic", "trendy", "casual"],
  },

  // Men's Jeans
  {
    id: "3",
    name: "Slim Fit Denim Jeans",
    description:
      "Modern slim fit jeans with stretch fabric for comfort and style.",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: "men",
    subcategory: "jeans",
    brand: "Denim Co",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506629905607-8582e5b4afca?w=500&h=600&fit=crop",
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    isDeal: true,
    tags: ["denim", "slim-fit", "stretch"],
  },

  // Women's Dresses
  {
    id: "4",
    name: "Floral Summer Dress",
    description: "Beautiful floral print dress perfect for summer occasions.",
    price: 59.99,
    category: "women",
    subcategory: "dresses",
    brand: "Flora Fashion",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral Blue", "Floral Pink", "Floral Yellow"],
    rating: 4.8,
    reviewCount: 203,
    inStock: true,
    isTrending: true,
    isNew: true,
    tags: ["floral", "summer", "feminine"],
  },

  // Women's Ethnic Wear
  {
    id: "5",
    name: "Embroidered Kurti",
    description:
      "Traditional embroidered kurti with intricate patterns and comfortable fit.",
    price: 45.99,
    originalPrice: 65.99,
    discount: 30,
    category: "women",
    subcategory: "kurtis",
    brand: "Ethnic Elegance",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Pink", "Green", "Yellow"],
    rating: 4.6,
    reviewCount: 87,
    inStock: true,
    isDeal: true,
    tags: ["ethnic", "embroidered", "traditional"],
  },

  // Kids
  {
    id: "6",
    name: "Kids Cartoon T-Shirt",
    description: "Fun cartoon print t-shirt for kids, made from soft cotton.",
    price: 19.99,
    category: "kids",
    subcategory: "boys",
    brand: "Little Style",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500&h=600&fit=crop",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    colors: ["Blue", "Red", "Green", "Yellow"],
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    isNew: true,
    tags: ["kids", "cartoon", "fun"],
  },

  // More products to fill the catalog
  {
    id: "7",
    name: "Formal Shirt",
    description: "Professional formal shirt for office and business meetings.",
    price: 49.99,
    category: "men",
    subcategory: "shirts",
    brand: "Business Pro",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Light Pink"],
    rating: 4.3,
    reviewCount: 145,
    inStock: true,
    tags: ["formal", "business", "professional"],
  },

  {
    id: "8",
    name: "Casual Sneakers",
    description: "Comfortable casual sneakers for everyday wear.",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    category: "men",
    subcategory: "shoes",
    brand: "Walk Comfort",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=600&fit=crop",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Gray", "Navy"],
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
    isTrending: true,
    tags: ["sneakers", "comfortable", "casual"],
  },

  {
    id: "9",
    name: "Stylish Top",
    description: "Trendy top with modern design, perfect for casual outings.",
    price: 34.99,
    category: "women",
    subcategory: "tops",
    brand: "Fashion Forward",
    images: [
      "https://images.unsplash.com/photo-1564584217132-2271339c9b46?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=500&h=600&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Red", "Blue"],
    rating: 4.4,
    reviewCount: 98,
    inStock: true,
    isNew: true,
    tags: ["stylish", "trendy", "casual"],
  },

  {
    id: "10",
    name: "Lehengas Choli",
    description:
      "Traditional lehenga choli set for special occasions and festivals.",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    category: "women",
    subcategory: "ethnic-wear",
    brand: "Royal Ethnic",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609251679014-4e0fda6d9d87?w=500&h=600&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Pink", "Green"],
    rating: 4.9,
    reviewCount: 167,
    inStock: true,
    isTrending: true,
    isDeal: true,
    tags: ["ethnic", "traditional", "festive"],
  },
];

export const deals: Deal[] = [
  {
    id: "1",
    title: "Flash Sale",
    description: "Limited time offer on selected items",
    image:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop",
    discount: 50,
    validUntil: "2024-12-31T23:59:59Z",
    products: products.filter((p) => p.isDeal).slice(0, 6),
  },
  {
    id: "2",
    title: "New Arrival Sale",
    description: "Get 30% off on all new arrivals",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
    discount: 30,
    validUntil: "2024-12-25T23:59:59Z",
    products: products.filter((p) => p.isNew).slice(0, 4),
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userId: "user1",
    userName: "John Smith",
    rating: 5,
    comment: "Excellent quality t-shirt! Very comfortable and fits perfectly.",
    date: "2024-01-15",
    helpful: 23,
  },
  {
    id: "2",
    productId: "1",
    userId: "user2",
    userName: "Sarah Johnson",
    rating: 4,
    comment: "Good quality but runs a bit small. Order one size up.",
    date: "2024-01-10",
    helpful: 18,
  },
  {
    id: "3",
    productId: "4",
    userId: "user3",
    userName: "Emily Davis",
    rating: 5,
    comment:
      "Beautiful dress! The floral print is gorgeous and the fabric is lightweight.",
    date: "2024-01-12",
    helpful: 31,
  },
];

export const mockUser: User = {
  id: "user1",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890",
  isAdmin: false,
  createdAt: "2024-01-01T00:00:00Z",
};

export const mockAdmin: User = {
  id: "admin1",
  email: "admin@example.com",
  firstName: "Admin",
  lastName: "User",
  phone: "+1234567890",
  isAdmin: true,
  createdAt: "2024-01-01T00:00:00Z",
};

export const brands = [
  "Urban Fit",
  "Style Co",
  "Denim Co",
  "Flora Fashion",
  "Ethnic Elegance",
  "Little Style",
  "Business Pro",
  "Walk Comfort",
  "Fashion Forward",
  "Royal Ethnic",
];

export const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest First" },
  { value: "discount", label: "Discount" },
];
