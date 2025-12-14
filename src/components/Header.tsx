import { useEffect, useState } from "react";
import { MapPin, ShoppingBag, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

type Order = {
  OrderID: string;
  RestaurantID: string;
  Status: string;
  EstimatedDeliveryMinutes?: number;
  CreatedAt?: string;
};

const Header = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch all orders when modal opens
  useEffect(() => {
    if (!isOrderModalOpen) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/GetOrderStatus`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load order queue.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isOrderModalOpen]);

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-bold text-foreground">
              Dash<span className="text-primary">Bite</span>
            </a>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#restaurants" className="text-sm text-muted-foreground hover:text-foreground">
                Restaurants
              </a>
              <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground">
                Categories
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                How it Works
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
              <MapPin className="h-4 w-4" />
              Set location
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="default"
              size="sm"
              className="gap-2"
              onClick={() => setIsOrderModalOpen(true)}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Order Status</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 🔹 ORDER STATUS MODAL */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              Active Orders Queue
            </h2>

            <button
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              Close
            </button>

            {loading && <p>Loading orders...</p>}

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {!loading && !error && orders.length === 0 && (
              <p className="text-muted-foreground">
                No active orders in the queue.
              </p>
            )}

            <div className="grid gap-4">
              {orders.map((order) => (
                <div
                  key={order.OrderID}
                  className="border rounded-lg p-4 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      Order #{order.OrderID}
                    </span>
                    <span className="text-sm text-primary">
                      {order.Status}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Restaurant ID: {order.RestaurantID}
                  </div>

                  {order.EstimatedDeliveryMinutes !== undefined && (
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4" />
                      ETA: {order.EstimatedDeliveryMinutes} mins
                    </div>
                  )}

                  {order.CreatedAt && (
                    <div className="text-xs text-muted-foreground">
                      Created: {new Date(order.CreatedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
