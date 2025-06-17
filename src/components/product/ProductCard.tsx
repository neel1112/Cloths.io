import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart with default size and color if available
    const defaultSize = product.sizes[0] || "M";
    const defaultColor = product.colors[0] || "Default";
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const discountedPrice = product.originalPrice
    ? product.originalPrice -
      (product.originalPrice * (product.discount || 0)) / 100
    : product.price;

  const handleViewProduct = () => {
    window.location.href = `/product/${product.id}`;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn("group relative", className)}
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="relative cursor-pointer" onClick={handleViewProduct}>
          <AspectRatio ratio={3 / 4}>
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className={cn(
                "object-cover w-full h-full transition-all duration-500",
                "group-hover:scale-105",
                !isImageLoaded && "opacity-0",
              )}
              onLoad={() => setIsImageLoaded(true)}
              onMouseEnter={() => {
                if (product.images.length > 1) {
                  setSelectedImageIndex(1);
                }
              }}
              onMouseLeave={() => setSelectedImageIndex(0)}
            />
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
          </AspectRatio>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                New
              </Badge>
            )}
            {product.discount && product.discount > 0 && (
              <Badge variant="destructive">-{product.discount}%</Badge>
            )}
            {product.isTrending && <Badge variant="secondary">Trending</Badge>}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleWishlist}
            className={cn(
              "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",
              "bg-background/80 hover:bg-background",
              isInWishlist(product.id) &&
                "opacity-100 text-red-500 hover:text-red-600",
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isInWishlist(product.id) && "fill-current",
              )}
            />
          </Button>

          {/* Quick Actions */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="bg-primary hover:bg-primary/90"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleViewProduct}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2 cursor-pointer" onClick={handleViewProduct}>
            {/* Brand */}
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </p>

            {/* Name */}
            <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-3 w-3",
                      star <= Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300",
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.originalPrice &&
                product.originalPrice !== product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">Colors:</span>
                <div className="flex space-x-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border-2 border-border"
                      style={{
                        backgroundColor: color.toLowerCase().includes("blue")
                          ? "#3B82F6"
                          : color.toLowerCase().includes("red")
                            ? "#EF4444"
                            : color.toLowerCase().includes("green")
                              ? "#10B981"
                              : color.toLowerCase().includes("yellow")
                                ? "#F59E0B"
                                : color.toLowerCase().includes("pink")
                                  ? "#EC4899"
                                  : color.toLowerCase().includes("black")
                                    ? "#000000"
                                    : color.toLowerCase().includes("white")
                                      ? "#FFFFFF"
                                      : color.toLowerCase().includes("gray")
                                        ? "#6B7280"
                                        : "#9CA3AF",
                      }}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
