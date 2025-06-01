import type { Item } from "./../types";
import ItemRow from "./ItemRow";

interface ItemListProps {
  items: Item[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ItemList({ items, onToggle, onDelete }: ItemListProps) {
  return (
    <ul>
      {items.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
