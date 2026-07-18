import { useState } from "react";
import "./App.css";

function Header({ totalTasks, completedTasks }) {
  return (
    <header>
      <h1>📝 My To-Do App</h1>
      <p>
        Total Tasks: {totalTasks} | Completed: {completedTasks}
      </p>
    </header>
  );
}

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedText = text.trim();

    if (trimmedText === "") {
      alert("Please write a task first.");
      return;
    }

    onAddTodo(trimmedText);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Write a task"
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
  return (
    <li>
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => onToggleTodo(todo.id)}>
        {todo.completed ? "Undo" : "Done"}
      </button>

      <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return <p>No tasks yet!🎉 Add one above.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);

  function handleAddTodo(taskText) {
    const newTodo = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  }

  function handleToggleTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function handleDeleteTodo(id) {
    const remainingTodos = todos.filter((todo) => todo.id !== id);
    setTodos(remainingTodos);
  }

  const completedTasks = todos.filter((todo) => todo.completed).length;

  return (
    <main>
      <Header totalTasks={todos.length} completedTasks={completedTasks} />

      <TodoForm onAddTodo={handleAddTodo} />

      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </main>
  );
}