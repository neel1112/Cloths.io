import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import { motion } from "framer-motion";

interface ProductSliderProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  products,
  viewAllLink,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold"
          >
            {title}
          </motion.h2>

          <div className="flex items-center space-x-2">
            {viewAllLink && (
              <Button variant="outline" asChild>
                <a href={viewAllLink}>View All</a>
              </Button>
            )}

            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll("left")}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll("right")}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Slider */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth gap-4 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-none w-72"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
