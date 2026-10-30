import { SquarePen, Trash } from "lucide-react";
import { useState, useRef, type SubmitEvent } from "react";

interface Todo {
  id: number;
  title: string;
  status: "belum" | "selesai";
}

const initialTodos: Todo[] = [
  { id: 1, title: "Belajar PHP", status: "belum" },
  { id: 2, title: "Kerjakan Tugas UX", status: "selesai" },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const nextId = useRef(
    Math.max(...initialTodos.map((todo) => todo.id), 0) + 1,
  );

  /**
   * Menangani proses submit form untuk menambahkan atau mengubah todo.
   *
   * @param e - Event submit form.
   */
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) return;

    if (editingId !== null) {
      updateTitleName(editingId, title);
    } else {
      addTodo(title);
    }

    closeModal();
  }

  /**
   * Menambahkan todo baru ke dalam daftar.
   *
   * @param title - Judul todo yang akan ditambahkan.
   */
  function addTodo(title: string) {
    setTodos((prev) => [
      ...prev,
      {
        id: nextId.current++,
        title: title.trim(),
        status: "belum",
      },
    ]);
  }

  /**
   * Mengubah judul todo berdasarkan ID.
   *
   * @param id - ID todo yang akan diubah.
   * @param title - Judul baru todo.
   */
  function updateTitleName(id: number, title: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: title.trim() } : todo,
      ),
    );
  }

  /**
   * Menutup modal dan mereset nilai form.
   */
  function closeModal() {
    setShowModal(false);
    setTitle("");
    setEditingId(null);
  }

  /**
   * Membuka modal edit dan mengisi form dengan data todo.
   *
   * @param todo - Data todo yang akan diedit.
   */
  function handleEdit(todo: Todo) {
    setEditingId(todo.id);
    setTitle(todo.title);
    setShowModal(true);
  }

  /**
   * Menghapus todo berdasarkan ID.
   *
   * @param id - ID todo yang akan dihapus.
   */
  function handleDelete(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  /**
   * Mengubah status todo berdasarkan kondisi checkbox.
   *
   * @param id - ID todo yang statusnya akan diubah.
   * @param checked - Kondisi checkbox.
   */
  function handleToggle(id: number, checked: boolean) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, status: checked ? "selesai" : "belum" }
          : todo,
      ),
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black">Todo List</h1>

          <button
            onClick={() => setShowModal(true)}
            className="border px-4 py-1 rounded-md"
          >
            Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-left">
            <thead>
              <tr className="border-y text-sm text-black">
                <th className="w-16 px-4 py-3">Completed</th>
                <th className="w-20 px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id} className="border-b text-sm">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={todo.status === "selesai"}
                      onChange={(e) => handleToggle(todo.id, e.target.checked)}
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
                      <button
                        onClick={() => handleEdit(todo)}
                        className="border border-gray-400 rounded-md px-3 py-1 hover:bg-gray-100"
                      >
                        <SquarePen className="size-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="border rounded-md border-gray-400 px-3 py-1 hover:bg-gray-100"
                      >
                        <Trash className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
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

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full rounded-md max-w-md border border-gray-300 bg-white p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-black">
                  {editingId !== null ? "Edit Todo" : "Add Todo"}
                </h2>

                <button onClick={closeModal} className="text-xl text-gray-600">
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <label className="mb-2 block text-sm text-black">Title</label>

                <input
                  autoFocus
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan title..."
                  className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
                />

                <div className="mt-5 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="border rounded-md border-gray-400 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!title.trim()}
                    className="border border-gray-500 rounded-md bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300 disabled:opacity-50"
                  >
                    {editingId !== null ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
