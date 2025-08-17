import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const newContext = createContext();

function ContextProvider({ children }) {
  const [todo, setTodo] = useState(() => {
    const saved = localStorage.getItem("todolist");
    return saved && saved !== "undefined" ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todo));
  }, [todo]);

  return (
    <newContext.Provider value={{ todo, setTodo, inputValue, setInputValue }}>
      {children}
    </newContext.Provider>
  );
}

export default ContextProvider;
