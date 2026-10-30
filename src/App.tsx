import { useState, type SubmitEvent } from "react";
import type { Todo } from "./types/todo.type";
import TodoHeader from "./components/todo-header";
import TodoTable from "./components/todo-table";
import TodoModal from "./components/todo-modal";

const initialTodos: Todo[] = [
  { id: 1, title: "Belajar PHP", status: "belum" },
  { id: 2, title: "Kerjakan Tugas UX", status: "selesai" },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  /**
   * Menangani proses submit form untuk menambahkan atau mengubah todo.
   *
   * @param e Event submit form.
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
   * @param title Judul todo yang akan ditambahkan.
   */
  function addTodo(title: string) {
    setTodos((prev) => {
      const newId =
        prev.length > 0 ? Math.max(...prev.map((todo) => todo.id)) + 1 : 1;
      return [
        ...prev,
        {
          id: newId,
          title: title.trim(),
          status: "belum",
        },
      ];
    });
  }

  /**
   * Mengubah judul todo berdasarkan ID.
   *
   * @param id ID todo yang akan diubah.
   * @param title Judul baru todo.
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
   * @param todo Data todo yang akan diedit.
   */
  function handleEdit(todo: Todo) {
    setEditingId(todo.id);
    setTitle(todo.title);
    setShowModal(true);
  }

  /**
   * Menghapus todo berdasarkan ID.
   *
   * @param id ID todo yang akan dihapus.
   */
  function handleDelete(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  /**
   * Mengubah status todo berdasarkan kondisi checkbox.
   *
   * @param id ID todo yang statusnya akan diubah.
   * @param checked Kondisi checkbox.
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
        <TodoHeader onAdd={() => setShowModal(true)} />

        <TodoTable
          todos={todos}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showModal && (
          <TodoModal
            editing={editingId !== null}
            title={title}
            onTitleChange={setTitle}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
