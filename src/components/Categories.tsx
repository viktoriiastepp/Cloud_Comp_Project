import { Utensils, Pizza, Salad, IceCream, Coffee, Sandwich, Fish, Beef } from "lucide-react";

const categories = [
  { name: "Burgers", icon: Beef, color: "bg-orange-100 text-orange-600" },
  { name: "Pizza", icon: Pizza, color: "bg-red-100 text-red-600" },
  { name: "Healthy", icon: Salad, color: "bg-green-100 text-green-600" },
  { name: "Desserts", icon: IceCream, color: "bg-pink-100 text-pink-600" },
  { name: "Coffee", icon: Coffee, color: "bg-amber-100 text-amber-700" },
  { name: "Sandwiches", icon: Sandwich, color: "bg-yellow-100 text-yellow-700" },
  { name: "Seafood", icon: Fish, color: "bg-blue-100 text-blue-600" },
  { name: "All Food", icon: Utensils, color: "bg-primary/10 text-primary" },
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Craving something specific? Explore our wide range of cuisines and find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <button
              key={category.name}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-card card-shadow hover:card-shadow-hover transition-smooth hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`p-4 rounded-xl ${category.color} transition-smooth group-hover:scale-110`}>
                <category.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-foreground">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
