interface TextInputProps {
  note: string;
  onNoteChange: (newNote: string) => void;
}

export default function TextInput({ note, onNoteChange }: TextInputProps) {
  return (
    <div className="mt-10">
      <label htmlFor="note" className="block text-lg font-medium mb-2">
        Anteckningar
      </label>
      <textarea
        id="note"
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        className="w-full border rounded p-2 min-h-[150px] resize-none"
      />
    </div>
  );
}
