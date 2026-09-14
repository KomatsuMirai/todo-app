type FilterStatus = {
  value: "all" | "incomplete" | "complete";
  label: string;
};

export const buttonFrame = "rounded-xl py-1 px-2 cursor-pointer ";
export const filterButtonFrame =
  "border-2 border-gray-700 rounded-2xl px-1.5 cursor-pointer ";

export const filterButtons: FilterStatus[] = [
  { value: "all", label: "全部" },
  { value: "incomplete", label: "未完了" },
  { value: "complete", label: "完了" },
];
