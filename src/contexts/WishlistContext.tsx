import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, WishlistItem } from "@/types";
import { toast } from "@/hooks/use-toast";

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        setItems(wishlistItems);
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
      toast({
        title: "Already in Wishlist",
        description: "This item is already in your wishlist.",
      });
      return;
    }

    const newItem: WishlistItem = {
      id: `wishlist_${product.id}_${Date.now()}`,
      product,
      addedAt: new Date().toISOString(),
    };

    setItems((prev) => [...prev, newItem]);
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const removeFromWishlist = (productId: string) => {
    const item = items.find((item) => item.product.id === productId);
    setItems((prev) => prev.filter((item) => item.product.id !== productId));

    if (item) {
      toast({
        title: "Removed from Wishlist",
        description: `${item.product.name} has been removed from your wishlist.`,
      });
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return items.some((item) => item.product.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
