import type { Todo } from "../types/todo.type";
import TodoRow from "./todo-row";

interface TodoTableProps {
  todos: Todo[];
  onToggle: (id: number, checked: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export default function TodoTable({
  todos,
  onToggle,
  onEdit,
  onDelete,
}: TodoTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="border-y text-sm bg-gray-200 text-black">
            <th className="w-16 px-4 py-3">Completed</th>
            <th className="w-20 px-4 py-3">ID</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <TodoRow
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

          {todos.length === 0 && (
            <tr>
              <td colSpan={5} className="border-b py-6 text-center">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
