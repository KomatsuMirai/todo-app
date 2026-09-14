import type { Todo } from "../types";
import { useState } from "react";

export function useAddTodoForm(
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
) {
  const [text, setText] = useState("");
  const [deadlineDate, setDeadlineDate] = useState<string>("");
  const [addErrorMessage, setAddErrorMessage] = useState<string>("");

  const handleAdd = () => {
    const trimmedText = text.trim();
    if (trimmedText === "") {
      setAddErrorMessage("空のTodoは追加できません");
      return;
    }
    if (todos.some((todo) => todo.text === trimmedText)) {
      setAddErrorMessage("todoの内容が重複しています");
      return;
    }
    //deadlineDate(文字列)をタイムスタンプ(数値)に変換
    const deadlineTimestamp = new Date(deadlineDate).getTime();
    const newTodo: Todo = {
      id: Date.now(),
      text: trimmedText,
      done: false,
      deadline: deadlineDate ? deadlineTimestamp : undefined,
    };
    setTodos([...todos, newTodo]);
    setText("");
    setDeadlineDate("");
    setAddErrorMessage("");
  };

  return {
    text,
    deadlineDate,
    addErrorMessage,
    setText,
    setDeadlineDate,
    setAddErrorMessage,
    handleAdd,
  };
}
