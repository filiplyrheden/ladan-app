import "./App.css";
import ItemForm from "./components/ItemForm";
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

  return (
    <>
      <h1>Ladan</h1>
      <ItemForm onAdd={addItem} />
    </>
  );
}

export default App;
