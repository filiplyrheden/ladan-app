import type { Item } from "../types";

interface ItemRowProps {
  item: Item;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ItemRow({ item, onToggle, onDelete }: ItemRowProps) {
  return (
    <li className="flex items-center justify-between border rounded px-3 py-2">
      <span>{item.name}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(item.id)}
          className={`px-2 py-1 rounded text-sm ${
            item.status === "finns"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {item.status === "finns" ? "Finns" : "Behövs"}
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="text-sm px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
