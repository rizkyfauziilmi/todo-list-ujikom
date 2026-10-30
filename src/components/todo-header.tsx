import Button from "./button";

interface TodoHeaderProps {
  onAdd: () => void;
}

export default function TodoHeader({ onAdd }: TodoHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-black">Todo List</h1>

      <Button onClick={onAdd} variant="primary">
        Add
      </Button>
    </div>
  );
}
