//todoの期限チェック
export const getDeadlineCategory = (
  deadline: number,
): "today" | "tomorrow" | "other" | "overdue" => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const oneDaysMs = 24 * 60 * 60 * 1000;
  const tomorrow = new Date(Date.now() + oneDaysMs);

  if (deadline < Date.now()) return "overdue";
  if (
    deadlineDate.getFullYear() === now.getFullYear() &&
    deadlineDate.getMonth() === now.getMonth() &&
    deadlineDate.getDate() === now.getDate()
  )
    return "today";
  if (
    deadlineDate.getFullYear() === tomorrow.getFullYear() &&
    deadlineDate.getMonth() === tomorrow.getMonth() &&
    deadlineDate.getDate() === tomorrow.getDate()
  )
    return "tomorrow";
  return "other";
};

export const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatDeadline = (deadline: number): string => {
  const category = getDeadlineCategory(deadline);
  const deadlineDate = new Date(deadline);
  const year = deadlineDate.getFullYear();
  const month = String(deadlineDate.getMonth() + 1).padStart(2, "0");
  const day = String(deadlineDate.getDate()).padStart(2, "0");
  const time = formatTime(deadlineDate);

  if (category === "today") return `🕐今日 ${time}`;
  if (category === "tomorrow") return `🕐明日 ${time}`;
  if (category === "overdue") return "期限切れ";

  return `🕐${year}/${month}/${day} ${time}`;
};
