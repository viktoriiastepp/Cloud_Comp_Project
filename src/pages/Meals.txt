import { useState } from "react";
import { getMealsByArea } from "../lib/api";

export default function Meals() {
  const [area, setArea] = useState("");
  const [meals, setMeals] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!area) {
      setMessage("Please enter an area");
      return;
    }

    const data = await getMealsByArea(area);
    if (data.length === 0) {
      setMessage("No meals found for this area.");
      setMeals([]);
    } else {
      setMeals(data);
      setMessage("");
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
            <strong>{meal.mealName}</strong> — ${meal.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
