import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
        style={{ padding: "10px", marginRight: "10px", width: "300px" }}
      />
      <button type="submit" style={{ padding: "10px 15px" }}>
        Add
      </button>
    </form>
  );
}
