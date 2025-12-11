import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Downtown",
    rating: 5,
    text: "DashBite has completely changed how I order food. The delivery is always on time and the food arrives hot. Can't recommend it enough!",
    avatar: "S",
  },
  {
    name: "Mike R.",
    location: "West Side",
    rating: 5,
    text: "Great selection of restaurants and super easy to use. The real-time tracking feature gives me peace of mind every time I order.",
    avatar: "M",
  },
  {
    name: "Emily L.",
    location: "Uptown",
    rating: 5,
    text: "As a busy mom, DashBite is a lifesaver. Quick delivery, amazing variety, and the kids love choosing their own meals from the app.",
    avatar: "E",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Loved by Thousands
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Don't just take our word for it. Here's what our customers have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className="relative p-8 rounded-2xl bg-card card-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
              
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                ))}
              </div>
              
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
