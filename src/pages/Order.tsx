import { useState, useEffect } from "react";
import { submitOrder } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");

  // Load cart from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  const handlePlaceOrder = async () => {
    if (!customerName || !customerAddress || !area) {
      setMessage("Please fill out all fields");
      return;
    }

    const orderData = {
      customerName,
      customerAddress,
      area,
      meals: cart,
    };

    try {
      const result = await submitOrder(orderData);

      // Optionally log the result
      console.log("Order result:", result);

      // Clear localStorage cart
      localStorage.removeItem("cart");

      // Navigate to confirmation page
      navigate("/confirmation");

    } catch (err) {
      console.error(err);
      setMessage("Order submission failed.");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>

      <div>
        <h3>Cart</h3>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.mealId}>
                {item.mealName} x {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Address"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <button onClick={handlePlaceOrder}>Place Order</button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
