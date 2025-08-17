import { useContext, useState } from "react";
import { newContext } from "../context/contextApi";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./todoItem";

function Todo() {
  const { inputValue, setInputValue } = useContext(newContext);
  const { setTodo } = useContext(newContext);
  function enterHandler(e) {
    const newTdod = {
      id: uuidv4(),
      name: inputValue,
      status: false,
    };
    if (inputValue.trim() !== "")
      if (e.key === "Enter") {
        setTodo((prev) => [...prev, newTdod]);
        setInputValue("");
      }
  }
  function btnHandler(e) {
    const newTdod = {
      id: uuidv4(),
      name: inputValue,
      status: false,
    };
    if (inputValue.trim() !== "") setTodo((prev) => [...prev, newTdod]);
    setInputValue("");
  }

  return (
    <div className="justify-center flex h-screen items-center">
      <div className="bg-white p-6 rounded-2xl w-1/2 max-lg:w-2/3 max-md:w-3/4 max-sm:w-full">
        <h1 className="text-blue-600 mb-4 text-3xl">to do list</h1>
        <hr className="text-gray-500" />
        <div className="border border-gray-300 p-2 rounded-xl mt-4 pl-5 mb-8 flex ">
          <input
            value={inputValue}
            placeholder="add to do"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={enterHandler}
            type="text"
            className="w-full outline-none "
          />
          <button
            onClick={btnHandler}
            className="bg-sky-400 px-7 py-3 rounded-xl text-white hover cursor-pointer max-md:py-2 max-md:px-5 max-sm:text-lg hover:bg-sky-500 transition ease-in text-xl"
          >
            add
          </button>
        </div>
        <TodoItem />
      </div>
    </div>
  );
}

export default Todo;
