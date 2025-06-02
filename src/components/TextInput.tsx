export default function TextInput() {
  return (
    <div className="mt-10">
      <h2>Anteckningar</h2>
      <textarea
        name="freetext"
        id="freetext"
        className="border border-gray-300 rounded-md p-2 w-60 h-50 resize-none"
      ></textarea>
    </div>
  );
}
