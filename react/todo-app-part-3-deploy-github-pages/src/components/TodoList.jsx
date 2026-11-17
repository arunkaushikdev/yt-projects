import TodoItem from "./TodoItem.jsx";

function TodoList({ tasks, emptyText, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-state">{emptyText}</p>;
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
