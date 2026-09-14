import type { Todo } from "../types";
import { useState } from "react";
import { formatTime } from "../utils/dateUtils";

export function useEditTodo(
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  setAddErrorMessage: (addErrorMessage: string) => void,
) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [editingDate, setEditingDate] = useState<string>("");
  const [editErrorMessage, setEditErrorMessage] = useState<string>("");

  const clearEditingState = () => {
    setEditingId(null);
    setEditingText("");
    setEditingDate("");
    setEditErrorMessage("");
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    const foundTodo = todos.find((todo) => todo.id === id);
    if (foundTodo) {
      setEditingText(foundTodo.text);
      if (foundTodo.deadline) {
        const deadlineDate = new Date(foundTodo.deadline);
        const year = deadlineDate.getFullYear();
        const month = String(deadlineDate.getMonth() + 1).padStart(2, "0");
        const day = String(deadlineDate.getDate()).padStart(2, "0");
        const time = formatTime(deadlineDate); // 時:分 を作っている
        setEditingDate(`${year}-${month}-${day}T${time}`);
      }
    }
  };

  const handleSave = (id: number) => {
    const trimmedText = editingText.trim();
    const editingTimestamp = new Date(editingDate).getTime();
    if (trimmedText === "") {
      setEditErrorMessage("空のTodoは追加できません");
      setAddErrorMessage("");
      return;
    }
    if (todos.some((todo) => todo.id !== id && todo.text === trimmedText)) {
      setEditErrorMessage("todoの内容が重複しています");
      setAddErrorMessage("");
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: trimmedText,
              deadline: editingDate ? editingTimestamp : undefined,
            }
          : todo,
      ),
    );
    clearEditingState();
  };

  const handleCancel = () => {
    clearEditingState();
  };

  return {
    editingId,
    editingText,
    editingDate,
    editErrorMessage,
    setEditingText,
    setEditingDate,
    handleEdit,
    handleSave,
    handleCancel,
  };
}
