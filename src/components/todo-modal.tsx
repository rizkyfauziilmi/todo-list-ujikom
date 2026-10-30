import type { SubmitEvent } from "react";
import Button from "./button";

interface TodoModalProps {
  editing: boolean;
  title: string;
  onTitleChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function TodoModal({
  editing,
  title,
  onTitleChange,
  onClose,
  onSubmit,
}: TodoModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full rounded-md max-w-md border border-gray-300 bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">
            {editing ? "Edit Todo" : "Add Todo"}
          </h2>

          <button onClick={onClose} className="text-xl text-gray-600">
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <label className="mb-2 block text-sm text-black">Title</label>

          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Masukkan title..."
            className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
          />

          <div className="mt-5 flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" variant="primary" disabled={!title.trim()}>
              {editing ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
