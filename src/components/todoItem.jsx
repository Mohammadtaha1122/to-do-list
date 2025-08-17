import { useContext, useState } from "react";
import { newContext } from "../context/contextApi";

function TodoItem() {
  const { todo, setTodo } = useContext(newContext);
  const [newText, setNewText] = useState("");
  const [inputId, setInputId] = useState();

  function statusHandler(id) {
    setTodo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  }

  function delHandler(id) {
    const todoFiltered = todo.filter((item) => item.id !== id);
    setTodo(todoFiltered);
  }

  function editHandler(id, name) {
    setInputId(id);
    setNewText(name);
  }

  function enterHandler(id) {
    if (newText === "") return 
    setTodo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newText } : item))
    );
    setInputId(null);
    setNewText("");
  }

  return (
    <li className="grid gap-5 items-center">
      {todo.length === 0 ? (
        <p className="text-center text-2xl ">empty</p>
      ) : (
        todo.map((item) => (
          <div
            className="border items-center border-gray-300 flex justify-between rounded-lg p-3"
            key={item.id}
          >
            {inputId === item.id ? (
              <div className="flex w-full border border-gray-300 rounded-xl">
                <input
                  onKeyDown={(e) => e.key === "Enter" && enterHandler(item.id)}
                  onChange={(e) => setNewText(e.target.value)}
                  value={newText}
                  type="text"
                  className="sm:p-4 max-sm:pl-2 outline-none w-full"
                  placeholder="edited to do"
                />
                <button
                onClick={() => enterHandler(item.id)}
                  className="bg-sky-400 px-7 py-3 rounded-xl text-white hover cursor-pointer hover:bg-sky-500 transition ease-in text-xl max-md:py-2 max-md:px-5 max-sm:text-sm"
                >
                  accept
                </button>
              </div>
            ) : (
              <p
                className={`text-lg ${
                  item.status ? "line-through text-gray-600" : ""
                }`}
              >
                {item.name}
              </p>
            )}
            <div className="grid grid-cols-3 items-center gap-4  justify-center max-sm:flex-col max-sm:gap-0">
              <button
                className="cursor-pointer"
                onClick={() => delHandler(item.id)}
              >
                ❌
              </button>
              <button
                onClick={() => editHandler(item.id, item.name)}
                className="cursor-pointer"
              >
                ✍
              </button>
              <input
                className="cursor-pointer"
                checked={item.status}
                type="checkbox"
                onChange={() => statusHandler(item.id)}
              />
            </div>
          </div>
        ))
      )}
    </li>
  );
}

export default TodoItem;
