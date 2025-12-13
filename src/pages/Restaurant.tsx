import { useState } from "react";
import { addMeal } from "../lib/api";

export default function RestaurantForm() {
  const [restaurantId, setRestaurantId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await addMeal({
      restaurantId,
      name,
      price: parseFloat(price),
      area,
    });

    setMessage("Meal added successfully!");
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
        placeholder="Restaurant ID"
        required
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Meal Name"
        required
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        placeholder="Price"
        required
      />
      <input
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="Area"
        required
      />
      <button type="submit">Add Meal</button>

      {message && <p>{message}</p>}
    </form>
  );
}
