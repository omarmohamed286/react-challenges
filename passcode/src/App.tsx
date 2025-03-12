import { useState } from "react";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const passcode = "4489";

const App = () => {
  const [userPasscode, setUserPasscode] = useState<string>("");
  const [isPasscodeTrue, setIsPasscodeTrue] = useState<boolean | null>(null);

  const handleOnNumberClicked = (number: number) => {
    const newPasscode = userPasscode + number.toString();
    setUserPasscode(newPasscode);
    if (newPasscode.length !== passcode.length) return;
    const isPasscodeMatch = newPasscode === passcode;
    setIsPasscodeTrue(isPasscodeMatch);
    setUserPasscode("");
    if (isPasscodeMatch) {
      setTimeout(() => {
        setIsPasscodeTrue(null);
      }, 2000);
    }
  };

  return (
    <div className="h-dvh grid place-content-center">
      <div>
        {!isPasscodeTrue &&
          numbers.map((number) => (
            <button
              key={number}
              className={`mr-3 p-10 rounded-md bg-gray-700 text-4xl text-white cursor-pointer border-2 hover:border-amber-300 focus:border-violet-500`}
              onClick={() => handleOnNumberClicked(number)}
            >
              {number}
            </button>
          ))}
      </div>
      <p className="text-center mt-3 text-3xl">
        {isPasscodeTrue == null
          ? ""
          : isPasscodeTrue
          ? "Success"
          : "Wrong Passcode"}
      </p>
    </div>
  );
};

export default App;
