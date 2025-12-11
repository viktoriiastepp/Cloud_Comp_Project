import { ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 hero-gradient">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to satisfy your cravings?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join over 50,000 happy customers who trust DashBite for their daily meals. Fast delivery, great food, unbeatable convenience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="xl" variant="hero" className="gap-2">
                Order Now
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="xl" variant="outline" className="gap-2 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Smartphone className="h-5 w-5" />
                Get the App
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "500+", label: "Restaurants" },
              { value: "25 min", label: "Avg. Delivery" },
              { value: "4.9★", label: "App Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm"
              >
                <p className="text-3xl font-bold text-primary-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
