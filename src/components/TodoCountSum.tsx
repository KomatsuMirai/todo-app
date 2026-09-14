import { buttonFrame } from "../styles/buttonStyles";

type TodoCountSumProps = {
  filter: "all" | "incomplete" | "complete";
  displayCount: number;
  incompleteCount: number;
  completeCount: number;
  allCompleteCount: number;
  handleDeleteCompleted: () => void;
};

export function TodoCountSum({
  filter,
  displayCount,
  incompleteCount,
  completeCount,
  allCompleteCount,
  handleDeleteCompleted,
}: TodoCountSumProps) {
  return (
    <div className="flex flex-row justify-between">
      <p>
        合計：{displayCount}件
        {filter === "all" &&
          `(未完了：${incompleteCount}件 / 完了：${completeCount}件)`}
      </p>
      <button
        onClick={() => handleDeleteCompleted()}
        className={`${buttonFrame} bg-teal-600 hover:bg-teal-700 text-white font-bold disabled:bg-gray-400 disabled:cursor-default`}
        disabled={allCompleteCount === 0}
      >
        完了済みのtodoを削除
      </button>
    </div>
  );
}
