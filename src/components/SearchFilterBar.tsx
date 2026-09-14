import { filterButtonFrame, filterButtons } from "../styles/buttonStyles";
import { inputFrame } from "../styles/inputStyles";

type SearchFilterBarProps = {
  filter: "all" | "incomplete" | "complete";
  searchText: string;
  setFilter: (word: "all" | "incomplete" | "complete") => void;
  setSearchText: (word: string) => void;
};

export function SearchFilterBar({
  filter,
  searchText,
  setFilter,
  setSearchText,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col  md:flex-row md:-mt-3  gap-3 items-center">
      <input
        type="search"
        value={searchText}
        placeholder="Todoを検索"
        className={inputFrame}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="flex gap-3">
        {filterButtons.map((filterButton) => (
          <button
            key={filterButton.value}
            onClick={() => setFilter(filterButton.value)}
            className={`${filterButtonFrame}
                          ${
                            filter === filterButton.value
                              ? "bg-teal-500 text-white font-bold"
                              : "text-gray-800 hover:bg-teal-300"
                          }`}
          >
            {filterButton.label}
          </button>
        ))}
      </div>
    </div>
  );
}
