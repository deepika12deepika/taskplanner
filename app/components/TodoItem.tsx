import { Todo } from '../types/Todo';

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="border p-4 my-2">
      <h3>{todo.title}</h3>
      <p>Priority: {todo.priority}</p>
    </div>
  );
}