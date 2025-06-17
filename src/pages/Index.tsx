import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RefreshCw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/hero/HeroSection";
import ProductSlider from "@/components/hero/ProductSlider";
import { Product, Deal } from "@/types";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { categories, deals } from "@/data/mockData";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featured, trending, newProducts, deals] = await Promise.all([
          api.getFeaturedProducts(),
          api.getTrendingProducts(),
          api.getNewArrivals(),
          api.getDealsProducts(),
        ]);

        setFeaturedProducts(featured);
        setTrendingProducts(trending);
        setNewArrivals(newProducts);
        setDealsProducts(deals);
      } catch (error) {
        console.error("Error loading homepage data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                description: "On orders over $50",
              },
              {
                icon: Shield,
                title: "Secure Payment",
                description: "100% secure checkout",
              },
              {
                icon: RefreshCw,
                title: "Easy Returns",
                description: "30-day return policy",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Customer service help",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-3">
                    <feature.icon className="h-12 w-12 mx-auto text-primary" />
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our wide range of fashion categories for men, women, and
              kids
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/products?category=${category.slug}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-64">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-2xl font-bold mb-2">
                            {category.name}
                          </h3>
                          <Button variant="secondary" size="sm">
                            Shop Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals of the Day */}
      {dealsProducts.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <Badge variant="destructive" className="mb-4">
                Limited Time Offer
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Deals of the Day</h2>
              <p className="text-muted-foreground">
                Don't miss out on these amazing deals!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.slice(0, 2).map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative h-48">
                      <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <Badge
                        variant="destructive"
                        className="absolute top-4 left-4"
                      >
                        -{deal.discount}% OFF
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {deal.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {deal.description}
                      </p>
                      <Button asChild className="w-full">
                        <Link to={`/products?sale=true`}>Shop Deal</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Products */}
      {trendingProducts.length > 0 && (
        <ProductSlider
          title="Trending Now"
          products={trendingProducts}
          viewAllLink="/products?trending=true"
        />
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="bg-muted/30">
          <ProductSlider
            title="New Arrivals"
            products={newArrivals}
            viewAllLink="/products?new=true"
          />
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl font-bold">Stay in the Loop</h2>
            <p className="text-lg opacity-90">
              Subscribe to our newsletter and be the first to know about new
              arrivals, exclusive deals, and fashion tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
