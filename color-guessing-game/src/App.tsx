import { useState } from "react";
import "./index.css";

const generateRandomColor = () => {
  const hexaContent = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  const color: string[] = ["#"];

  for (let index = 0; index < 6; index++) {
    color.push(hexaContent[~~(hexaContent.length * Math.random())]);
  }
  return color.join("");
};

const currentColor = generateRandomColor();
const colorsToChooseFrom = [
  currentColor,
  generateRandomColor(),
  generateRandomColor(),
];

function shuffle(array: string[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
shuffle(colorsToChooseFrom);

type ColorsState = {
  currentColor: string;
  colors: string[];
  isAnswerRight: boolean | null;
};

const App = () => {
  const [colors, setColors] = useState<ColorsState>({
    currentColor: currentColor,
    colors: colorsToChooseFrom,
    isAnswerRight: null,
  });
  return (
    <div className="container">
      <div
        style={{
          height: "300px",
          width: "300px",
          backgroundColor: colors.currentColor,
        }}
      ></div>
      <div className="buttonsContainer">
        {colors.colors.map((color) => {
          return (
            <button
              key={color}
              onClick={() => {
                if (color == colors.currentColor) {
                  const newColor = generateRandomColor();
                  const newColors = [
                    newColor,
                    generateRandomColor(),
                    generateRandomColor(),
                  ];
                  shuffle(newColors);
                  setColors({
                    ...colors,
                    isAnswerRight: true,
                    currentColor: newColor,
                    colors: newColors,
                  });
                } else {
                  setColors({ ...colors, isAnswerRight: false });
                }
              }}
            >
              {color}
            </button>
          );
        })}
      </div>
      <div style={{ textAlign: "center" }}>
        {colors.isAnswerRight == null ? (
          ""
        ) : colors.isAnswerRight ? (
          <p style={{ color: "green" }}>Correct!</p>
        ) : (
          <p style={{ color: "red" }}>Wrong</p>
        )}
      </div>
    </div>
  );
};

export default App;
