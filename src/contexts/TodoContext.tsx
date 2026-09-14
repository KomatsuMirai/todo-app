import type { ReactNode } from "react";

import type { Todo } from "../types";

import { createContext, useState, useEffect } from "react";
import { isValidTodos } from "../utils/validateTodos";
import { getDeadlineCategory } from "../utils/dateUtils";
import { useAddTodoForm } from "../hooks/useAddTodoForm";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { useEditTodo } from "../hooks/useEditTodo";
import { useToggleTodo } from "../hooks/useToggleTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodo";

type TodoContextType = {
  todos: Todo[];
  activeTodos: Todo[];
  filteredOverdueTodos: Todo[];
  allCompleteCount: number;
  text: string;
  deadlineDate: string;
  addErrorMessage: string;
  editingId: number | null;
  editingText: string;
  editingDate: string;
  editErrorMessage: string;
  filter: "all" | "incomplete" | "complete";
  searchText: string;
  filteredTodos: Todo[];
  overdueTodos: Todo[];
  displayCount: number;
  incompleteCount: number;
  completeCount: number;
  setText: (text: string) => void;
  setDeadlineDate: (text: string) => void;
  setAddErrorMessage: (addErrorMessage: string) => void;
  handleAdd: () => void;
  setEditingText: (value: string) => void;
  setEditingDate: (value: string) => void;
  handleEdit: (id: number) => void;
  handleCancel: () => void;
  handleSave: (id: number) => void;
  setFilter: (word: "all" | "incomplete" | "complete") => void;
  setSearchText: (word: string) => void;
  setTodos: (todos: Todo[]) => void;
  handleToggle: (id: number) => void;
  handleDelete: (id: number) => void;
  handleDeleteCompleted: () => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

const initialTodos: Todo[] = [
  { id: 1, text: "買い物 リスト", done: false },
  { id: 2, text: "掃除する", done: true },
  { id: 3, text: "散歩に行く", done: false },
  { id: 4, text: "Apple Pie を作る", done: true },
  { id: 5, text: "本を読む", done: false },
];

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos === null) {
      return initialTodos;
    }
    try {
      const parsedTodos = JSON.parse(savedTodos);
      if (isValidTodos(parsedTodos)) {
        return parsedTodos;
      } else {
        console.warn(
          "保存データが Todo の配列形式ではありません。",
          parsedTodos,
        );
        return initialTodos;
      }
    } catch (error) {
      console.error("JSONが壊れています。", error);
      return initialTodos;
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const activeTodos = todos.filter(
    (todo) =>
      !todo.deadline ||
      getDeadlineCategory(todo.deadline) !== "overdue" ||
      todo.done,
  );

  const filteredOverdueTodos = todos.filter(
    (todo) =>
      todo.deadline &&
      !todo.done &&
      getDeadlineCategory(todo.deadline) === "overdue",
  );

  const allCompleteCount = todos.filter((todo) => todo.done).length;

  const {
    text,
    deadlineDate,
    addErrorMessage,
    setText,
    setDeadlineDate,
    setAddErrorMessage,
    handleAdd,
  } = useAddTodoForm(todos, setTodos);

  const {
    editingId,
    editingText,
    editingDate,
    editErrorMessage,
    setEditingText,
    setEditingDate,
    handleEdit,
    handleCancel,
    handleSave,
  } = useEditTodo(todos, setTodos, setAddErrorMessage);

  const {
    filter,
    searchText,
    filteredTodos,
    overdueTodos,
    displayCount,
    incompleteCount,
    completeCount,
    setFilter,
    setSearchText,
  } = useSearchFilter(activeTodos, filteredOverdueTodos);

  const { handleToggle } = useToggleTodo(todos, setTodos);

  const { handleDelete, handleDeleteCompleted } = useDeleteTodo(
    todos,
    setTodos,
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        activeTodos,
        filteredOverdueTodos,
        allCompleteCount,
        text,
        deadlineDate,
        addErrorMessage,
        editingId,
        editingText,
        editingDate,
        editErrorMessage,
        filter,
        searchText,
        filteredTodos,
        overdueTodos,
        displayCount,
        incompleteCount,
        completeCount,
        setText,
        setDeadlineDate,
        setAddErrorMessage,
        handleAdd,
        setEditingText,
        setEditingDate,
        handleEdit,
        handleCancel,
        handleSave,
        setFilter,
        setSearchText,
        handleToggle,
        handleDelete,
        handleDeleteCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
