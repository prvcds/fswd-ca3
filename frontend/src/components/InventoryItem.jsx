const InventoryItem = ({ item }) => {
    return (
      <div className="inventory-item">
        <h3>{item.name}</h3>
        <p>Quantity: {item.quantity}</p>
      </div>
    );
  };
  
  export default InventoryItem;
  