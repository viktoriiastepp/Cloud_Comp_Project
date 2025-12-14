import { MapPin, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold text-foreground">
            Dash<span className="text-primary">Bite</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#restaurants" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Restaurants
            </a>
            <a href="#categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Categories
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              How it Works
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
            <MapPin className="h-4 w-4" />
            <span>Set location</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="default" size="sm" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Order Status</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
