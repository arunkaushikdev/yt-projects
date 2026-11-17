import { useState, useEffect } from "react";

function TodoForm({ onAdd, onUpdate, editingTask, onCancel }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
    } else {
      setText("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    if (editingTask) {
      onUpdate(editingTask.id, trimmed);
    } else {
      onAdd(trimmed);
    }
    setText("");
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
