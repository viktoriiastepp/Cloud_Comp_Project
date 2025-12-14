import { API_URL } from "@/config";

export async function getRestaurants() {
  const response = await fetch(`${API_URL}/getrestaurants`);

  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  const data = await response.json();
  return data.restaurants;
}
