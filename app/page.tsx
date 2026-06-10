'use client';
import { useState } from 'react';
import { Todo } from './types/Todo';
import TodoForm from './components/ToDoForm';
import TodoItem from './components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = (todo: Todo) => setTodos([...todos, todo]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">TaskPlanner</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </main>
  );
}