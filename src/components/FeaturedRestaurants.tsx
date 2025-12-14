import { useState, useEffect } from "react";
import { Star, Clock, Bike } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Restaurant = {
  RowKey: string;
  Name: string;
  Cuisine: string;
  ImageURL?: string;
  Featured?: boolean;
  DeliveryFee: string;
  DeliveryTime: number;
  Rating?: number;
};

type Meal = {
  MealID: string;
  Name: string;
  Description?: string;
  Price: number;
  ImageURL?: string;
  Availability?: string;
};

const FeaturedRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);

  // Fetch restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/getrestaurants`);
        const data = await res.json();
        const updated = data.restaurants.map((r: any) => ({ ...r, Rating: 5 }));
        setRestaurants(updated);
      } catch (err) {
        console.error("Error loading restaurants:", err);
      }
    };
    fetchRestaurants();
  }, []);

  // Fetch meals for a restaurant
  const handleRestaurantClick = async (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
    setOrderId(null);
    setEstimatedTime(null);
    setIsAddMealOpen(false);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/getmeals?restaurantId=${restaurant.RowKey}`
      );
      const data = await res.json();
      const updatedMeals = data.meals.map((meal: any) => ({
        ...meal,
        ImageURL: meal.ImageURL || "https://via.placeholder.com/150",
        MealID: meal.RowKey || meal.id || meal.Name || "",
      }));
      setMeals(updatedMeals);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setMeals([]);
    }
  };

  // Place an order
  const handleOrder = async (meal: Meal) => {
    if (!selectedRestaurant) return;
    if (!meal.MealID) return alert("Cannot order this meal — missing MealID");

    try {
      const body = {
        RestaurantID: selectedRestaurant.RowKey,
        Meals: [{ MealID: meal.MealID, Qty: 1 }],
      };
      const res = await fetch(`${import.meta.env.VITE_API_URL}/submitorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to place order");
      }
      const data = await res.json();
      setOrderId(data.OrderID);
      setEstimatedTime(data.EstimatedDeliveryMinutes);
      alert(`Order placed! ID: ${data.OrderID}. ETA: ${data.EstimatedDeliveryMinutes} mins`);
    } catch (err: any) {
      console.error("Error placing order:", err);
      alert(`Failed to place order. ${err.message || ""}`);
    }
  };

  // Submit Add Meal form
  const handleAddMeal = async (formData: FormData) => {
    if (!selectedRestaurant) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/AddMeal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partition_key: selectedRestaurant.RowKey,
          row_key: formData.get("row_key"),
          name: formData.get("name"),
          description: formData.get("description"),
          price: formData.get("price"),
          image_url: formData.get("image_url"),
          availability: formData.get("availability"),
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Meal added successfully!");
        setIsAddMealOpen(false);
        // Refresh meals list
        handleRestaurantClick(selectedRestaurant);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add meal.");
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
          <a href="#" className="text-primary font-semibold hover:underline">View all →</a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <article
              key={restaurant.RowKey}
              onClick={() => handleRestaurantClick(restaurant)}
              className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-smooth hover:-translate-y-1 cursor-pointer"
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

      {/* Modal */}
      {isModalOpen && selectedRestaurant && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 flex items-center relative">
              {selectedRestaurant.Name} Menu

              {/* Add Meal button next to title */}
              <button
                className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={() => setIsAddMealOpen(!isAddMealOpen)}
              >
                Add Meal
              </button>

              {/* Close button top-right */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 px-2 py-1"
              >
                Close
              </button>
            </h2>

            {/* Add Meal Form */}
            {isAddMealOpen && (
              <div className="border p-4 rounded mb-4 bg-gray-50">
                <h3 className="font-semibold mb-2">Add New Meal</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddMeal(new FormData(e.currentTarget));
                  }}
                  className="flex flex-col gap-2"
                >
                  <input name="row_key" type="text" placeholder="Meal ID" required className="border p-1 rounded" />
                  <input name="name" type="text" placeholder="Meal Name" required className="border p-1 rounded" />
                  <textarea name="description" placeholder="Description" className="border p-1 rounded" />
                  <input name="price" type="number" step="0.01" placeholder="Price" required className="border p-1 rounded" />
                  <input name="image_url" type="text" placeholder="Image URL" className="border p-1 rounded" />
                  <select name="availability" className="border p-1 rounded" defaultValue="Available">
                    <option value="Available">Available</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                  <button type="submit" className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Add Meal
                  </button>
                </form>
              </div>
            )}

            {/* Meals List */}
            <div className="grid gap-4">
              {meals.length === 0 && <p>No meals available.</p>}
              {meals.map((meal) => (
                <div key={meal.MealID} className="flex items-center gap-4 border-b pb-2">
                  <img src={meal.ImageURL} alt={meal.Name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{meal.Name}</h3>
                    <p className="text-sm text-muted-foreground">{meal.Description}</p>
                    <p className="text-primary font-bold">${meal.Price}</p>
                    <button
                      className="mt-2 px-3 py-1 bg-primary text-white rounded hover:bg-primary/80"
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
