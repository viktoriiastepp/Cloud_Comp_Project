// src/lib/api.ts

const BASE_URL = "https://g7functionapp-fdfsdtbpgtadcrby.canadacentral-01.azurewebsites.net/api";

// Calls your AddMeal function
export async function addMeal(meal: {
  restaurantId: string;
  name: string;
  price: number;
  area: string;
}) {
  const response = await fetch(`${BASE_URL}/AddMeal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meal),
  });
  return response.json();
}

// Calls your GetMealsByArea function
export async function getMealsByArea(area: string) {
  const response = await fetch(`${BASE_URL}/GetMealsByArea?area=${encodeURIComponent(area)}`);
  return response.json();
}

// Calls your SubmitOrder function
export async function submitOrder(order: {
  customerName: string;
  customerAddress: string;
  area: string;
  meals: any[];
}) {
  const response = await fetch(`${BASE_URL}/SubmitOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return response.json();
}
