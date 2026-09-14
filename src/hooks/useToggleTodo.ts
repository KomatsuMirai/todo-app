import type { Todo } from "../types";

export function useToggleTodo(
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
) {
  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };
  return { handleToggle };
}
