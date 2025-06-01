import type { Item } from "./../types";
import ItemRow from "./ItemRow";

interface ItemListProps {
  items: Item[];
  onToggle: (id: number) => void;
}

export default function ItemList({ items, onToggle }: ItemListProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <ItemRow key={item.id} item={item} onToggle={onToggle} />
      ))}
    </ul>
  );
}
