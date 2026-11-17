import { useState } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
  };

  return (
    <div className="app">
      <div className="todo-card">
        <header className="app-header">
          <h1>Advanced Todo App</h1>
          <p>Plan your day, one task at a time.</p>
        </header>

        <TodoForm
          onAdd={addTask}
          onUpdate={updateTask}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        <TodoList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
