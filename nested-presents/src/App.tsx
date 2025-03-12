import { useState } from "react";

const PRESENT_IMG = "gift.png";
const MAIN_WIDTH = 200;
const hierarchy = [
  {
    width: MAIN_WIDTH,
    id: crypto.randomUUID(),
    childs: [
      {
        width: MAIN_WIDTH - 100,
        id: crypto.randomUUID(),
        childs: [
          {
            width: MAIN_WIDTH - 150,
            id: crypto.randomUUID(),
            childs: [
              { width: MAIN_WIDTH - 180, id: crypto.randomUUID(), childs: [] },
            ],
          },
        ],
      },
      { width: MAIN_WIDTH - 100, id: crypto.randomUUID(), childs: [] },
    ],
  },
  {
    width: MAIN_WIDTH,
    id: crypto.randomUUID(),
    childs: [{ width: MAIN_WIDTH - 100, id: crypto.randomUUID(), childs: [] }],
  },
  {
    width: MAIN_WIDTH,
    id: crypto.randomUUID(),
    childs: [{ width: MAIN_WIDTH - 100, id: crypto.randomUUID(), childs: [] }],
  },
];

const App = () => {
  const [presents, setPresents] = useState(hierarchy);

  const handlePresentClicked = (presentId: string) => {
    const filteredList = presents.flatMap((presentFromMap) => {
      if (presentFromMap.id == presentId) {
        return presentFromMap.childs;
      }
      return presentFromMap;
    });
    setPresents(filteredList);
  };

  return (
    <div className="h-dvh grid place-content-center bg-gray-600">
      <div className="flex gap-10 items-center justify-center flex-wrap ">
        {presents.map((present) => (
          <img
            key={present.id}
            src={PRESENT_IMG}
            alt="Gift"
            className="cursor-pointer aspect-square"
            style={{ width: present.width }}
            onClick={() => handlePresentClicked(present.id)}
          ></img>
        ))}
      </div>
    </div>
  );
};

export default App;
