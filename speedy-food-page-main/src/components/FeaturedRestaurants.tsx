import { Star, Clock, Bike } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const restaurants = [
  {
    name: "Burger Palace",
    cuisine: "American • Burgers",
    rating: 4.8,
    deliveryTime: "15-25",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    featured: true,
  },
  {
    name: "Pizza Heaven",
    cuisine: "Italian • Pizza",
    rating: 4.9,
    deliveryTime: "20-30",
    deliveryFee: "$1.99",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    featured: false,
  },
  {
    name: "Green Bowl",
    cuisine: "Healthy • Salads",
    rating: 4.7,
    deliveryTime: "10-20",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    featured: true,
  },
  {
    name: "Sushi Master",
    cuisine: "Japanese • Sushi",
    rating: 4.9,
    deliveryTime: "25-35",
    deliveryFee: "$2.99",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop",
    featured: false,
  },
  {
    name: "Taco Fiesta",
    cuisine: "Mexican • Tacos",
    rating: 4.6,
    deliveryTime: "15-25",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    featured: false,
  },
  {
    name: "Sweet Treats",
    cuisine: "Desserts • Bakery",
    rating: 4.8,
    deliveryTime: "20-30",
    deliveryFee: "$1.49",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop",
    featured: true,
  },
];

const FeaturedRestaurants = () => {
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
              key={restaurant.name}
              className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-smooth hover:-translate-y-1 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                />
                {restaurant.featured && (
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-0">
                    Featured
                  </Badge>
                )}
                {restaurant.deliveryFee === "Free" && (
                  <Badge variant="secondary" className="absolute top-3 right-3">
                    Free Delivery
                  </Badge>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-smooth">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="text-sm font-semibold text-primary">{restaurant.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{restaurant.cuisine}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {restaurant.deliveryTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Bike className="h-4 w-4" />
                    {restaurant.deliveryFee}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
