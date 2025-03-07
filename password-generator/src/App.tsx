import { useState } from "react";

const generatePassword = (
  length: number,
  filters: FliterState = {
    isUpper: true,
    isLower: true,
    isSpecial: true,
    isNumbers: true,
  }
) => {
  const uppercaseChars = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const lowercaseChars = uppercaseChars.map((char) => char.toLowerCase());
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*"];
  let filteredArray: string[] = [];
  if (filters.isUpper) {
    filteredArray = filteredArray.concat(uppercaseChars);
  }
  if (filters.isLower) {
    filteredArray = filteredArray.concat(lowercaseChars);
  }
  if (filters.isSpecial) {
    filteredArray = filteredArray.concat(specialChars);
  }
  if (filters.isNumbers) {
    filteredArray = filteredArray.concat(numbers);
  }
  filteredArray.sort(() => Math.random() - 0.5);
  const passwordArray = [];
  for (let index = 0; index < length; index++) {
    passwordArray.push(filteredArray[index]);
  }
  return passwordArray.join("");
};

type FliterState = {
  isUpper: boolean;
  isLower: boolean;
  isSpecial: boolean;
  isNumbers: boolean;
};

const App = () => {
  const [filters, setFilters] = useState<FliterState>({
    isUpper: true,
    isLower: true,
    isSpecial: true,
    isNumbers: true,
  });
  const [passwordLength, setPasswordLength] = useState(8);
  const password = generatePassword(passwordLength, filters);

  const handleOnLengthChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(e.target.valueAsNumber);
  };
  const handleOnFilterChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
  };
  const handleOnCopyClicked = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="bg-[#020610] h-dvh grid place-content-center gap-5 grid-cols-[minmax(10rem,50rem)]">
      <div className="bg-white h-60 w-full rounded-md">
        <div className="flex gap-5 m-10">
          <input
            className="bg-[#4B5563] px-5 py-3 text-white rounded-sm text-lg w-20"
            readOnly
            type="number"
            value={passwordLength}
            onChange={handleOnLengthChanged}
          ></input>
          <input
            type="range"
            onChange={handleOnLengthChanged}
            min={8}
            max={32}
            value={passwordLength}
          />
        </div>
        <div className="grid grid-cols-2 gap-5 m-10">
          <label className="text-lg">
            <input
              type="checkbox"
              className="mr-3"
              name="isUpper"
              checked={filters.isUpper}
              onChange={handleOnFilterChanged}
            />
            Uppercase
          </label>
          <label className="text-lg">
            <input
              type="checkbox"
              className="mr-3"
              name="isLower"
              checked={filters.isLower}
              onChange={handleOnFilterChanged}
            />
            Lowercase
          </label>
          <label className="text-lg">
            <input
              type="checkbox"
              className="mr-3"
              name="isNumbers"
              checked={filters.isNumbers}
              onChange={handleOnFilterChanged}
            />
            Numbers
          </label>
          <label className="text-lg">
            <input
              type="checkbox"
              className="mr-3"
              name="isSpecial"
              checked={filters.isSpecial}
              onChange={handleOnFilterChanged}
            />
            Special
          </label>
        </div>
      </div>
      <div className="bg-white h-40 w-full rounded-md flex gap-3 items-center">
        <input
          className="bg-[#4B5563] m-10 p-3 text-white text-xl rounded"
          type="text"
          readOnly
          value={password}
        />
        <i
          className="fa-solid fa-copy text-[#4B5563] text-2xl cursor-pointer"
          onClick={handleOnCopyClicked}
        ></i>
      </div>
    </div>
  );
};

export default App;
