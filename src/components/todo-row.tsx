import { SquarePen, Trash } from "lucide-react";
import type { Todo } from "../types/todo.type";
import Button from "./button";

interface TodoRowProps {
  todo: Todo;
  onToggle: (id: number, checked: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export default function TodoRow({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoRowProps) {
  return (
    <tr className="border-b text-sm">
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={todo.status === "selesai"}
          onChange={(e) => onToggle(todo.id, e.target.checked)}
        />
      </td>

      <td className="px-4 py-3">{todo.id}</td>

      <td className="px-4 py-3">
        <span
          className={
            todo.status === "selesai"
              ? "text-gray-500 line-through"
              : "text-black"
          }
        >
          {todo.title}
        </span>
      </td>

      <td className="px-4 py-3">
        {todo.status === "selesai" ? "Selesai" : "Belum"}
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-center gap-2">
          {/* NOTE: disabled edit dan delete ketika sudah completed 
          (Atep Aulia Rahman S.T.,M.Kom) */}
          <Button
            onClick={() => onEdit(todo)}
            disabled={todo.status === "selesai"}
            variant="secondary"
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            onClick={() => onDelete(todo.id)}
            disabled={todo.status === "selesai"}
            variant="danger"
          >
            <Trash className="size-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
