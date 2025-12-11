import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 bg-foreground text-background">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="/" className="text-2xl font-bold">
              Dash<span className="text-primary">Bite</span>
            </a>
            <p className="text-background/60 mt-4 text-sm leading-relaxed">
              Your favorite restaurants, delivered fast. Order food from the best local spots with just a few taps.
            </p>
            <div className="flex gap-4 mt-6">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-smooth"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Press"],
            },
            {
              title: "For You",
              links: ["How it Works", "Promotions", "Gift Cards", "Partner"],
            },
            {
              title: "Support",
              links: ["Help Center", "Safety", "Terms", "Privacy"],
            },
            {
              title: "Cities",
              links: ["New York", "Los Angeles", "Chicago", "Miami"],
            },
          ].map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-background/60 hover:text-primary transition-smooth">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © 2024 DashBite. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-background/60 hover:text-primary transition-smooth">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-background/60 hover:text-primary transition-smooth">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
