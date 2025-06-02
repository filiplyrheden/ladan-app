import "./App.css";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import TextInput from "./components/TextInput";
import type { Item } from "./types";
import { useState, useRef } from "react";
import { supabase } from "./supabase";
import { useEffect } from "react";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [note, setNote] = useState<string>("");
  const [noteId, setNoteId] = useState<number | null>(null);
  const saveTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    fetchItems();
    fetchNote();
  }, []);

  async function fetchNote() {
    const { data, error } = await supabase
      .from("notes")
      .select("id, note")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Fel vid hämtning av note:", error);
      return;
    }

    if (data) {
      setNote(data.note);
      setNoteId(data.id);
    } else {
      console.log("Ingen anteckning hittades");

      const { data: newData, error: insertError } = await supabase
        .from("notes")
        .insert([{ note: "" }])
        .select()
        .single();

      if (newData) {
        setNote("");
        setNoteId(newData.id);
      }

      if (insertError) {
        console.error("Kunde inte skapa anteckning:", insertError);
      }
    }
  }

  function handleNoteChange(newNote: string) {
    setNote(newNote);

    // Rensa tidigare timeout om det finns
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Sätt ny timeout för autosave
    saveTimeoutRef.current = window.setTimeout(() => {
      updateNote(newNote);
    }, 1000); // 1 sekund fördröjning
  }

  async function updateNote(newNote: string) {
    if (noteId === null) return;

    const { error } = await supabase
      .from("notes")
      .update({ note: newNote })
      .eq("id", noteId);

    if (error) {
      console.error("Fel vid uppdatering av note:", error);
    }
  }

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
      <h1 className="text-7xl mb-10">Ladan</h1>
      <div className="flex flex-col gap-8">
        <ItemList items={items} onToggle={toggleStatus} onDelete={deleteItem} />
        <ItemForm onAdd={addItem} />
      </div>
      <TextInput note={note} onNoteChange={handleNoteChange} />
    </div>
  );
}

export default App;
