import { useContext } from "react";

import { AddTodoForm } from "./components/AddTodoForm";

import { TodoList } from "./components/TodoList";
import { SearchFilterBar } from "./components/SearchFilterBar";
import { TodoCountSum } from "./components/TodoCountSum";
import { TodoContext } from "./contexts/TodoContext";

function App() {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error("TodoProviderの外で使われています");
  }
  return (
    <div className="min-h-screen bg-teal-100 py-6">
      <div className="max-w-xl mx-auto space-y-6">
        <AddTodoForm
          text={context.text}
          deadlineDate={context.deadlineDate}
          addErrorMessage={context.addErrorMessage}
          handleAdd={context.handleAdd}
          setText={context.setText}
          setDeadlineDate={context.setDeadlineDate}
        />

        <SearchFilterBar
          filter={context.filter}
          searchText={context.searchText}
          setFilter={context.setFilter}
          setSearchText={context.setSearchText}
        />

        <TodoCountSum
          filter={context.filter}
          displayCount={context.displayCount}
          incompleteCount={context.incompleteCount}
          completeCount={context.completeCount}
          allCompleteCount={context.allCompleteCount}
          handleDeleteCompleted={context.handleDeleteCompleted}
        />

        {context.displayCount === 0 && <p>該当するtodoはありません</p>}

        {context.overdueTodos.length > 0 && context.filter !== "complete" && (
          <div className="bg-teal-300 border-4 border-red-500 rounded-2xl p-1 ">
            <h2 className="font-bold pl-1">
              ⚠️期限切れ：{context.overdueTodos.length}件
            </h2>
            <TodoList
              displayTodos={context.overdueTodos}
              editingId={context.editingId}
              editingText={context.editingText}
              editingDate={context.editingDate}
              editErrorMessage={context.editErrorMessage}
              handleCancel={context.handleCancel}
              handleDelete={context.handleDelete}
              handleEdit={context.handleEdit}
              handleSave={context.handleSave}
              handleToggle={context.handleToggle}
              setEditingDate={context.setEditingDate}
              setEditingText={context.setEditingText}
            />
          </div>
        )}

        {context.filteredTodos.length !== 0 && (
          <div className="bg-teal-200 border-4 rounded-2xl border-teal-700 p-2">
            <TodoList
              displayTodos={context.filteredTodos}
              editingId={context.editingId}
              editingText={context.editingText}
              editingDate={context.editingDate}
              editErrorMessage={context.editErrorMessage}
              handleCancel={context.handleCancel}
              handleDelete={context.handleDelete}
              handleEdit={context.handleEdit}
              handleSave={context.handleSave}
              handleToggle={context.handleToggle}
              setEditingDate={context.setEditingDate}
              setEditingText={context.setEditingText}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
