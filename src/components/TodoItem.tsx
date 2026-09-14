import type { Todo } from "../types";
import { formatDeadline } from "../utils/dateUtils";
import { inputFrame } from "../styles/inputStyles";
import { buttonFrame } from "../styles/buttonStyles";

type TodoItemProps = {
  todo: Todo;
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

export function TodoItem({
  todo,
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
}: TodoItemProps) {
  return (
    <li
      className={
        "p-3 " +
        "hover:bg-teal-400 " +
        (todo.done ? " text-gray-500 line-through" : " text-gray-800 ")
      }
    >
      {todo.id === editingId ? (
        <>
          <div className="flex flex-col md:flex-row gap-1">
            <input
              type="text"
              value={editingText}
              className={inputFrame}
              onChange={(e) => setEditingText(e.target.value)}
            />
            <input
              type="datetime-local"
              value={editingDate}
              className={inputFrame}
              onChange={(e) => setEditingDate(e.target.value)}
            />

            <button
              className={
                buttonFrame +
                "bg-teal-600 hover:bg-teal-700 text-white font-bold"
              }
              onClick={() => handleSave(todo.id)}
            >
              保存
            </button>
            <button
              className={buttonFrame + "border-2"}
              onClick={() => handleCancel()}
            >
              キャンセル
            </button>
          </div>
          {editErrorMessage && (
            <p className="text-red-700 text-sm font-bold">
              ❌{editErrorMessage}
            </p>
          )}
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => handleToggle(todo.id)}
          />
          <span className="mr-2">{todo.text}</span>
          {todo.deadline !== undefined && (
            <span className="mx-2">{formatDeadline(todo.deadline)}</span>
          )}
          {!todo.done && (
            <button
              className={buttonFrame + "border-2"}
              onClick={() => handleEdit(todo.id)}
            >
              編集
            </button>
          )}
          <button
            aria-label="削除"
            className="cursor-pointer"
            onClick={() => handleDelete(todo.id)}
          >
            🗑️
          </button>
        </>
      )}
    </li>
  );
}
