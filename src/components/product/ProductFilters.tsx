import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { FilterOptions } from "@/types";
import { brands } from "@/data/mockData";

interface ProductFiltersProps {
  filters: Partial<FilterOptions>;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onClearFilters: () => void;
  className?: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  className,
}) => {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof FilterOptions, value: string) => {
    const currentArray = (filters[key] as string[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const hasActiveFilters = Object.values(filters).some((value) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-6">
          {/* Price Range */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <Label className="text-sm font-medium">Price Range</Label>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              <div className="px-2">
                <Slider
                  value={filters.priceRange || [0, 200]}
                  onValueChange={(value) =>
                    updateFilter("priceRange", value as [number, number])
                  }
                  max={200}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>${filters.priceRange?.[0] || 0}</span>
                  <span>${filters.priceRange?.[1] || 200}</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Brands */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <Label className="text-sm font-medium">Brands</Label>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={(filters.brands || []).includes(brand)}
                    onCheckedChange={() => toggleArrayFilter("brands", brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm">
                    {brand}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Sizes */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <Label className="text-sm font-medium">Sizes</Label>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <Badge
                    key={size}
                    variant={
                      (filters.sizes || []).includes(size)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleArrayFilter("sizes", size)}
                  >
                    {size}
                  </Badge>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Colors */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <Label className="text-sm font-medium">Colors</Label>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              <div className="grid grid-cols-4 gap-2">
                {[
                  "Black",
                  "White",
                  "Red",
                  "Blue",
                  "Green",
                  "Yellow",
                  "Pink",
                  "Gray",
                ].map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                      (filters.colors || []).includes(color)
                        ? "border-primary scale-110"
                        : "border-border hover:scale-105"
                    }`}
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
                    onClick={() => toggleArrayFilter("colors", color)}
                    title={color}
                  />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Rating */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <Label className="text-sm font-medium">Rating</Label>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={(filters.ratings || []).includes(rating)}
                    onCheckedChange={() =>
                      toggleArrayFilter("ratings", rating.toString())
                    }
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm flex items-center"
                  >
                    {rating} stars & up
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Other Filters */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="discount"
                checked={filters.discount || false}
                onCheckedChange={(checked) => updateFilter("discount", checked)}
              />
              <Label htmlFor="discount" className="text-sm">
                On Sale
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStock || false}
                onCheckedChange={(checked) => updateFilter("inStock", checked)}
              />
              <Label htmlFor="inStock" className="text-sm">
                In Stock Only
              </Label>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductFilters;
