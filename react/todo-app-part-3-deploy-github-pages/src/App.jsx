import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoFilters from "./components/TodoFilters.jsx";
import TodoList from "./components/TodoList.jsx";
import "./App.css";

const STORAGE_KEY = "advanced-todo-tasks";

const loadTasks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text: text,
      priority: priority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, newText, newPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText, priority: newPriority }
          : task
      )
    );
    setEditingTask(null);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
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

        <TodoFilters filter={filter} onChange={setFilter} counts={counts} />

        <TodoList
          tasks={visibleTasks}
          emptyText={
            filter === "all"
              ? "No tasks yet. Add your first task above!"
              : `No ${filter} tasks.`
          }
          onToggle={toggleTask}
          onEdit={setEditingTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
