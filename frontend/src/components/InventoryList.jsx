import { useState, useEffect } from "react";
import InventoryItem from "./InventoryItem";
import InventoryForm from "./InventoryForm";

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // Fetch items when component loads
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch items: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched items:", data);
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError("Failed to load inventory items.");
      });
  }, []);

  // Add new item to inventory
  const addItem = async (item) => {
    try {
      const res = await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        throw new Error(`Failed to add item: ${res.status}`);
      }

      const newItem = await res.json();
      setItems((prevItems) => [...prevItems, newItem]); // Update state
    } catch (error) {
      console.error("Error adding item:", error);
      setError("Failed to add item. Please check your input.");
    }
  };

  return (
    <div>
      <InventoryForm addItem={addItem} />
      <h2>Inventory List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul>
          {items.map((item) => (
            <InventoryItem key={item._id || item.name} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryList;
