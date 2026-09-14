import type { Todo } from "../types";

export function useDeleteTodo(
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
) {
  const handleDelete = (id: number) => {
    if (confirm("削除しますか")) {
      setTodos(todos.filter((todo) => id !== todo.id));
    }
  };
  const handleDeleteCompleted = () => {
    if (confirm("完了済みのtodoを削除します")) {
      setTodos(todos.filter((todo) => !todo.done));
    }
  };

  return { handleDelete, handleDeleteCompleted };
}
