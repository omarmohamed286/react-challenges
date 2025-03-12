import { useState } from "react";

const App = () => {
  const [circles, setCircles] = useState<
    { xAxis: number; yAxis: number; key: string }[]
  >([]);
  const [savedCircles, setSavedCircles] = useState<
    { xAxis: number; yAxis: number; key: string }[]
  >([]);

  return (
    <div
      className="bg-neutral-700 h-dvh relative"
      onClick={(e) => {
        const key = crypto.randomUUID();
        setCircles([...circles, { xAxis: e.clientX, yAxis: e.clientY, key }]);
        setSavedCircles([
          ...savedCircles,
          { xAxis: e.clientX, yAxis: e.clientY, key },
        ]);
      }}
    >
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5"
        onClick={(e) => {
          e.stopPropagation();
          setCircles([]);
        }}
      >
        Destroy
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={(e) => {
          e.stopPropagation();
          setCircles(savedCircles);
        }}
      >
        Restore
      </button>

      {circles.length > 0 &&
        circles.map((circle) => {
          return (
            <div
              key={circle.key}
              className="h-10 w-10 rounded-full bg-white absolute"
              style={{
                top: circle.yAxis - 20,
                left: circle.xAxis - 20,
              }}
            ></div>
          );
        })}
    </div>
  );
};

export default App;

{
  /* <div className="h-10 w-10 rounded-full bg-white"></div> */
}
