import { buttonFrame } from "../styles/buttonStyles";
import { inputFrame } from "../styles/inputStyles";

type AddTodoProps = {
  text: string;
  deadlineDate: string;
  addErrorMessage: string;
  handleAdd: () => void;
  setText: (text: string) => void;
  setDeadlineDate: (text: string) => void;
};

export function AddTodoForm({
  text,
  deadlineDate,
  addErrorMessage,
  handleAdd,
  setText,
  setDeadlineDate,
}: AddTodoProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col md:flex-row md:flex-wrap md:gap-x-3 items-center">
        <input
          type="text"
          value={text}
          className={inputFrame}
          onChange={(e) => setText(e.target.value)}
        />
        {addErrorMessage && (
          <p className="md:w-full md:order-last text-red-700 text-sm font-bold">
            ❌{addErrorMessage}
          </p>
        )}
        <input
          type="datetime-local"
          value={deadlineDate}
          className={`${inputFrame} mt-2 md:mt-0`}
          onChange={(e) => setDeadlineDate(e.target.value)}
        />
        <button
          className={`${buttonFrame} font-bold mt-2 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white`}
          onClick={handleAdd}
        >
          登録
        </button>
      </div>
    </div>
  );
}
