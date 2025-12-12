import { Search, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroFood from "@/assets/hero-food.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroFood} 
          alt="Delicious food delivery" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/40" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 animate-fade-in">
            <Clock className="h-4 w-4" />
            Average delivery: 25 min
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Your favorite food,
            <br />
            <span className="text-primary">delivered fast</span>
          </h1>
          
          <p className="text-lg text-background/80 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Order from the best local restaurants with easy, on-demand delivery. Fresh meals at your doorstep in minutes.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter your delivery address"
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-background text-foreground placeholder:text-muted-foreground border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button size="xl" className="gap-2">
              <Search className="h-5 w-5" />
              Find Food
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/80 border-2 border-background flex items-center justify-center text-xs text-primary-foreground font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-background/80">50k+ happy customers</span>
            </div>
            <div className="h-4 w-px bg-background/30 hidden sm:block" />
            <span className="text-sm text-background/80">⭐ 4.9 average rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
