import { useState, useEffect } from "react";
import { Star, Clock, Bike } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FeaturedRestaurants = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [meals, setMeals] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Fetch restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/getrestaurants`);
        const data = await res.json();
        const updated = data.restaurants.map((r: any) => ({
          ...r,
          Rating: 5
        }));
        setRestaurants(updated);
      } catch (err) {
        console.error("Error loading restaurants:", err);
      }
    };
    fetchRestaurants();
  }, []);

  // Fetch meals when restaurant clicked
  const handleRestaurantClick = async (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
    setOrderId(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/getmeals?restaurantId=${restaurant.RowKey}`);
      const data = await res.json();

      // Force all meals to use ImageURL; fallback to placeholder
      const updatedMeals = data.meals.map((meal: any) => ({
        ...meal,
        ImageURL: meal.ImageURL || "https://via.placeholder.com/150"
      }));

      setMeals(updatedMeals);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setMeals([]);
    }
  };

  // Handle ordering a meal
  const handleOrder = async (meal: any) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ordermeal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealName: meal.Name, restaurantId: selectedRestaurant.RowKey })
      });
      const data = await res.json();
      setOrderId(data.orderId);
      localStorage.setItem("currentOrderId", data.orderId);
      alert(`Order placed! Your order ID is ${data.orderId}`);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <section id="restaurants" className="py-20">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Featured Restaurants
            </h2>
            <p className="text-muted-foreground">
              Discover top-rated restaurants in your area
            </p>
          </div>
          <a href="#" className="text-primary font-semibold hover:underline">
            View all →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant, index) => (
            <article
              key={restaurant.RowKey}
              onClick={() => handleRestaurantClick(restaurant)}
              className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-smooth hover:-translate-y-1 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.ImageURL || "https://via.placeholder.com/150"}
                  alt={restaurant.Name}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                />
                {restaurant.Featured && (
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-0">
                    Featured
                  </Badge>
                )}
                {restaurant.DeliveryFee === "Free" && (
                  <Badge variant="secondary" className="absolute top-3 right-3">
                    Free Delivery
                  </Badge>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-smooth">
                    {restaurant.Name}
                  </h3>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="text-sm font-semibold text-primary">{restaurant.Rating}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{restaurant.Cuisine}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {restaurant.DeliveryTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Bike className="h-4 w-4" />
                    {restaurant.DeliveryFee}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal for meals */}
      {isModalOpen && selectedRestaurant && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-xl max-w-lg w-full overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
              {selectedRestaurant.Name} Menu
              {orderId && (
                <button
                  className="ml-2 px-3 py-1 bg-secondary text-white rounded hover:bg-secondary/80 transition"
                  onClick={() => window.open(`/order-status/${orderId}`, "_blank")}
                >
                  Check Order Status
                </button>
              )}
            </h2>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              Close
            </button>

            <div className="grid gap-4">
              {meals.length === 0 && <p>No meals available.</p>}
              {meals.map((meal) => (
                <div key={meal.Name} className="flex items-center gap-4 border-b pb-2">
                  <img
                    src={meal.ImageURL || "https://via.placeholder.com/150"}
                    alt={meal.Name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{meal.Name}</h3>
                    <p className="text-sm text-muted-foreground">{meal.Description}</p>
                    <p className="text-primary font-bold">${meal.Price}</p>
                    <button
                      className="mt-2 px-3 py-1 bg-primary text-white rounded hover:bg-primary/80 transition"
                      onClick={() => handleOrder(meal)}
                    >
                      Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedRestaurants;
