import { useState, useEffect } from "react";

function TodoForm({ onAdd, onUpdate, editingTask, onCancel }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
      setPriority(editingTask.priority);
    } else {
      setText("");
      setPriority("medium");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    if (editingTask) {
      onUpdate(editingTask.id, trimmed, priority);
    } else {
      onAdd(trimmed, priority);
    }
    setText("");
    setPriority("medium");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="priority-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" className="btn btn-primary">
        {editingTask ? "Update" : "Add Task"}
      </button>
      {editingTask && (
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TodoForm;
