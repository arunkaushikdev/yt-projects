function TodoItem({ task, onEdit, onDelete }) {
  return (
    <li className="todo-item">
      <span className="todo-text">{task.text}</span>
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
