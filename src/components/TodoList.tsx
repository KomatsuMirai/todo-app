import { TodoItem } from "./TodoItem";
import type { Todo } from "../types";

type TodoListProps = {
  displayTodos: Todo[];
  editingId: number | null;
  editingText: string;
  editingDate: string;
  editErrorMessage: string;
  handleToggle: (id: number) => void;
  handleEdit: (id: number) => void;
  handleSave: (id: number) => void;
  handleCancel: () => void;
  handleDelete: (id: number) => void;
  setEditingText: (value: string) => void;
  setEditingDate: (value: string) => void;
};

export function TodoList({
  displayTodos,
  editingId,
  editingText,
  editingDate,
  editErrorMessage,
  handleToggle,
  handleEdit,
  setEditingText,
  setEditingDate,
  handleSave,
  handleCancel,
  handleDelete,
}: TodoListProps) {
  return (
    <ul className="list-none ">
      {displayTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editingId={editingId}
          editingText={editingText}
          editingDate={editingDate}
          editErrorMessage={editErrorMessage}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleToggle={handleToggle}
          setEditingDate={setEditingDate}
          setEditingText={setEditingText}
        />
      ))}
    </ul>
  );
}
