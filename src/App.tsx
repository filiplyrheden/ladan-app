import "./App.css";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import type { Item } from "./types";
import { useState } from "react";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  function addItem(name: string) {
    const newItem: Item = {
      id: Date.now(),
      name,
      status: "behövs",
    };
    setItems([newItem, ...items]);
  }

  function toggleStatus(id: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "finns" ? "behövs" : "finns",
            }
          : item
      )
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Ladan</h1>
      <ItemForm onAdd={addItem} />
      <ItemList items={items} onToggle={toggleStatus} />
    </div>
  );
}

export default App;
