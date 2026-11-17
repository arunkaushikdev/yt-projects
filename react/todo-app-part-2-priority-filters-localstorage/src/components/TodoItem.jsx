function TodoItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        className="todo-check"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="todo-text">{task.text}</span>
      <span className={`priority-badge priority-${task.priority}`}>
        {task.priority}
      </span>
      <div className="todo-actions">
        <button className="btn btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
