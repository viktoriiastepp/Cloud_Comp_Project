import { MapPin, Utensils, Bike } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Enter your address",
    description: "Tell us where you are and we'll show you the best restaurants nearby.",
    color: "bg-primary text-primary-foreground",
  },
  {
    icon: Utensils,
    title: "Choose your meal",
    description: "Browse menus, read reviews, and pick your favorite dishes from top restaurants.",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Bike,
    title: "Fast delivery",
    description: "Track your order in real-time and enjoy fresh food delivered to your door.",
    color: "bg-foreground text-background",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How DashBite Works
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Getting your food delivered has never been easier. Three simple steps to satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl ${step.color} mb-6 shadow-lg`}>
                  <step.icon className="h-10 w-10" />
                </div>
                
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center text-sm font-bold text-foreground">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
