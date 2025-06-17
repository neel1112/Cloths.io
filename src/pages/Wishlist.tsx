import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    const defaultSize = item.product.sizes[0] || "M";
    const defaultColor = item.product.colors[0] || "Default";
    addToCart(item.product, defaultSize, defaultColor, 1);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <Heart className="h-24 w-24 mx-auto text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground">
              Save items you love for later
            </p>
          </div>
          <Button asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">{items.length} items saved</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group relative overflow-hidden">
              <div className="relative">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromWishlist(item.product.id)}
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background text-red-500 hover:text-red-600"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {item.product.brand}
                  </p>
                  <h3 className="font-medium line-clamp-2">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {item.product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      ${item.product.price.toFixed(2)}
                    </span>
                    {item.product.originalPrice &&
                      item.product.originalPrice !== item.product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.product.originalPrice.toFixed(2)}
                        </span>
                      )}
                  </div>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="w-full"
                    size="sm"
                    disabled={!item.product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {item.product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
