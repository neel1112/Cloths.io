import React from "react";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Orders = () => {
  // Mock orders data
  const orders = [
    {
      id: "#ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 159.98,
      items: [
        {
          id: "1",
          name: "Classic Cotton T-Shirt",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
          price: 29.99,
          quantity: 2,
        },
        {
          id: "4",
          name: "Floral Summer Dress",
          image:
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop",
          price: 59.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "#ORD-2024-002",
      date: "2024-01-20",
      status: "shipped",
      total: 89.99,
      trackingNumber: "TRK123456789",
      items: [
        {
          id: "8",
          name: "Casual Sneakers",
          image:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
          price: 89.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "#ORD-2024-003",
      date: "2024-01-22",
      status: "processing",
      total: 124.97,
      items: [
        {
          id: "3",
          name: "Slim Fit Denim Jeans",
          image:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
          price: 79.99,
          quantity: 1,
        },
        {
          id: "5",
          name: "Embroidered Kurti",
          image:
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&h=600&fit=crop",
          price: 45.99,
          quantity: 1,
        },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-600" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground mb-4">
            Start shopping to see your orders here
          </p>
          <Button>Start Shopping</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Ordered on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </Badge>
                    <p className="text-lg font-semibold mt-1">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                {order.trackingNumber && (
                  <div className="text-sm text-muted-foreground">
                    Tracking: {order.trackingNumber}
                  </div>
                )}
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {index < order.items.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        Leave Review
                      </Button>
                    )}
                    {order.status === "shipped" && (
                      <Button variant="outline" size="sm">
                        Track Package
                      </Button>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
