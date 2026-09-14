import type { Todo } from "../types";
import { useState } from "react";

export function useSearchFilter(
  activeTodos: Todo[],
  filteredOverdueTodos: Todo[],
) {
  const [filter, setFilter] = useState<"all" | "incomplete" | "complete">(
    "all",
  );
  const [searchText, setSearchText] = useState<string>("");

  //日本語ユーザーの入力に考慮し、半角・全角スペース両方を区切り文字に
  //[ 　] = 半角スペース or 全角スペース, + = 1個以上の連続
  const searchTodos = (todos: Todo[], sText: string): Todo[] => {
    const searchWords = sText.split(/[ 　]+/).filter((word) => word !== "");
    const result = todos.filter((todo) =>
      searchWords.every((word) =>
        todo.text.toLowerCase().includes(word.toLowerCase()),
      ),
    );
    return result;
  };

  const getStatusFilteredTodos = (): Todo[] => {
    if (filter === "all") {
      return activeTodos;
    } else if (filter === "incomplete") {
      return activeTodos.filter((todo) => !todo.done);
    }
    return activeTodos.filter((todo) => todo.done);
  };

  const getFilteredTodos = (): Todo[] => {
    const filterStatus = getStatusFilteredTodos();
    return searchTodos(filterStatus, searchText);
  };
  const filteredTodos = getFilteredTodos();

  const overdueTodos = searchTodos(filteredOverdueTodos, searchText);

  const displayCount =
    filter !== "complete"
      ? filteredTodos.length + overdueTodos.length
      : filteredTodos.length;
  const incompleteCount =
    filteredTodos.filter((todo) => !todo.done).length + overdueTodos.length;
  const completeCount = filteredTodos.filter((todo) => todo.done).length;

  return {
    filter,
    setFilter,
    searchText,
    setSearchText,
    filteredTodos,
    overdueTodos,
    displayCount,
    incompleteCount,
    completeCount,
  };
}
