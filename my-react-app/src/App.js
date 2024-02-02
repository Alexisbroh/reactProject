import React, { useEffect, useState } from "react";

function App() {
  const [apiData, setApiData] = useState(null);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/items');
        const data = await response.json();
        console.log(data)
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async () => {
    try {
      const response = await fetch('http://localhost:3000/items', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newItemName }),
      });
      const data = await response.json();
      
      setApiData([...apiData, data]);
      setNewItemName("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await fetch(`http://localhost:3000/items/${id}`, {
        method: "DELETE",
      });
      setApiData(apiData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <h1>HELLO WORLD</h1>
      {apiData && (
        <div>
          <h2>API Data</h2>
          <ul>
            {apiData.map((item) => (
              <li key={item._id}>
                {item.name}
                <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
