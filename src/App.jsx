import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charectorAllowed, setCharectorAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOLPURSTULVXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";

    if (charectorAllowed) str += "`!@#$%^&*(){}[]~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charectorAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charectorAllowed, setPassword, passwordGenerator]);

  // copy to clipboard
  const copyPasswordToChipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="text-orange-600 shadow bg-gray-900 w-full mx-auto rounded-xl my-2.5  max-w-md min-w-6  ">
        <h1 className="text-center text-white text-3xl p-5">
          Password Generator!
        </h1>
        {/* <h1 className="text-amber-400"> password{password}</h1> */}

        <div className="flex mb-4  overflow-hidden shadow  ">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            placeholder="Password"
            className="bg-gray-800 mb-4 outline-none w-full text-white rounded-3xl p-3 text-3xl"
            readOnly
          />
          <button
            onClick={copyPasswordToChipBoard}
            className="bg-blue-500 rounded-2xl mb-4 p-3 ml-1 cursor-pointer hover:bg-blue-700 text-black font-bold hover:text-white "
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2.5  ">
          <div className="mb-5 flex justify-center items-center gap-2 text-sm px-7">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={56}
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              />
              <label>Length:  {length} </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setnumberAllowed((prev) => !prev);
                }}
                id="idNumberInput"
              />
              <label  htmlFor="idNumberInput">Number</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charectorAllowed}
                onChange={() => {
                  setCharectorAllowed((prev) => !prev);
                }}
                id="idNumberInput"
              />
              <label htmlFor="idNumberInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
