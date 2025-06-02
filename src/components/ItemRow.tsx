import type { Item } from "../types";

interface ItemRowProps {
  item: Item;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ItemRow({ item, onToggle, onDelete }: ItemRowProps) {
  return (
    <li className="flex items-center justify-between px-3 py-2">
      <span>{item.name}</span>
      <div className="flex items-center gap-10">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={item.status === "finns"}
            onChange={() => onToggle(item.id)}
          />
          <div className="relative w-11 h-6 bg-red-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-red-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
          <span className="ms-3 text-sm font-light"></span>
        </label>
        <button
          onClick={() => onDelete(item.id)}
          className="text-[8px] px-1 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          ❌
        </button>
      </div>
    </li>
  );
}
