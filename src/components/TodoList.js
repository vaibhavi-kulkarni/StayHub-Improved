export default function TodoList({ todos, toggleTodo, deleteTodo }) {
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: "5px 10px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
  