import { useState } from "react";

const defaultItems = [
  { id: crypto.randomUUID().toString(), content: "A" },
  { id: crypto.randomUUID(), content: "B" },
  { id: crypto.randomUUID(), content: "C" },
];

const App = () => {
  const [items, setItems] = useState(defaultItems);

  const addNewItem = (id: string, place: "right" | "left") => {
    const newItem = { id: crypto.randomUUID(), content: "" };
    const newItemsList = items.flatMap((itemFromMap) => {
      if (itemFromMap.id == id) {
        return place == "left"
          ? [newItem, itemFromMap]
          : [itemFromMap, newItem];
      }
      return itemFromMap;
    });
    setItems(newItemsList);
  };

  const handleOnContentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: { id: string; content: string }
  ) => {
    const newItemsList = items.map((itemFromMap) => {
      if (itemFromMap.id == item.id) {
        return { ...item, content: e.target.value };
      }
      return itemFromMap;
    });
    setItems(newItemsList);
  };

  return (
    <div className="h-dvh bg-gray-600 grid place-content-center">
      <div className="flex flex-wrap justify-center text-3xl">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-blue-400 p-15 cursor-pointer rounded-2xl"
            onClick={(e) => {
              const container = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - container.left;
              if (x < 50) {
                addNewItem(item.id, "left");
              }
              if (x > 100) {
                addNewItem(item.id, "right");
              }
            }}
          >
            <input
              type="text"
              value={item.content}
              className="border-2 border-amber-300 w-10"
              onChange={(e) => handleOnContentChange(e, item)}
            />
          </div>
        ))}
      </div>
      <p className="mt-8 text-4xl text-center text-white">
        {items.map((item) => item.content)}
      </p>
    </div>
  );
};

export default App;
