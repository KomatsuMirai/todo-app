import type { Todo } from "../types";

//ローカルストレージの値が正しいかを判断する
export const isValidTodos = (value: unknown): value is Todo[] => {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every(
    (item) =>
      item !== null &&
      typeof item.id === "number" &&
      typeof item.text === "string" &&
      typeof item.done === "boolean",
  );
};
