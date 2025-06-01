import "./App.css";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import type { Item } from "./types";
import { useState } from "react";
import { supabase } from "./supabase";
import { useEffect } from "react";
import { data } from "autoprefixer";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("id", { ascending: false });
    if (data) setItems(data);
    if (error) console.error("Fel vid hämtning:", error);
  }

  async function addItem(name: string) {
    const { data, error } = await supabase
      .from("items")
      .insert([{ name, status: "behövs" }])
      .select();

    if (data) setItems((prev) => [data[0], ...prev]);
    if (error) console.error("Fel vid tillägg:", error);
  }

  async function toggleStatus(id: number) {
    const current = items.find((item) => item.id === id);
    if (!current) return;

    const newStatus = current.status === "finns" ? "behövs" : "finns";
    const { data, error } = await supabase
      .from("items")
      .update({ status: newStatus })
      .eq("id", id)
      .select();

    if (data) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    }
    if (error) console.error("Fel vid uppdatering:", error);
  }

  async function deleteItem(id: number) {
    const { error } = await supabase.from("items").delete().eq("id", id);
    if (error) {
      console.error("Fel vid radering:", error);
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Ladan</h1>
      <ItemForm onAdd={addItem} />
      <ItemList items={items} onToggle={toggleStatus} onDelete={deleteItem} />
    </div>
  );
}

export default App;
