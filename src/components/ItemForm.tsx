import { useState } from "react";

interface ItemProps {
  onAdd: (name: string) => void;
}

export default function ItemForm({ onAdd }: ItemProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="flex-grow border px-2 py-1 rounded"
        placeholder="Lägg till..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Lägg till
      </button>
    </form>
  );
}
