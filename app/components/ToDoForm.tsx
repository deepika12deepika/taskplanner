'use client';
import { useState } from 'react';
import { Todo } from '../types/Todo';

export default function ToDoForm({ addTodo }: { addTodo: (todo: Todo) => void }) {
  const [title, setTitle] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({ id: Date.now().toString(), title, priority: 'medium', dueDate: '', completed: false });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Add New Task</button>
    </form>
  );
}