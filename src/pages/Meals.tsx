import { useState } from "react";
import { getMealsByArea } from "../lib/api";

export default function Meals() {
  const [area, setArea] = useState("");
  const [meals, setMeals] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState<any[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = async () => {
    if (!area) {
      setMessage("Please enter an area");
      return;
    }

    const data = await getMealsByArea(area);
    if (!data || data.length === 0) {
      setMessage("No meals found for this area.");
      setMeals([]);
    } else {
      setMeals(data);
      setMessage("");
    }
  };

  const addToCart = (meal: any) => {
    const existing = cart.find((c) => c.mealId === meal.mealId);
    if (existing) {
      const updated = cart.map((c) =>
        c.mealId === meal.mealId ? { ...c, quantity: c.quantity + 1 } : c
      );
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    } else {
      const updated = [...cart, { ...meal, quantity: 1 }];
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  return (
    <div>
      <h2>Search Meals by Area</h2>
      <input
        type="text"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="Enter area"
      />
      <button onClick={handleSearch}>Search</button>

      {message && <p>{message}</p>}

      <ul>
        {meals.map((meal) => (
          <li key={meal.mealId}>
            <strong>{meal.mealName}</strong> — ${meal.price}{" "}
            <button onClick={() => addToCart(meal)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <h3>Your Cart</h3>
        {cart.length === 0 && <p>No items yet</p>}
        <ul>
          {cart.map((item) => (
            <li key={item.mealId}>
              {item.mealName} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
