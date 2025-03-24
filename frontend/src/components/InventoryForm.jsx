import { useState } from "react";

const InventoryForm = ({ addItem }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity) return;

    addItem({ name, quantity });
    setName("");
    setQuantity("");
  };

  return (
    <form onSubmit={handleSubmit} className="inventory-form">
      <input 
        type="text" 
        placeholder="Item Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        placeholder="Quantity" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        required 
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default InventoryForm;
