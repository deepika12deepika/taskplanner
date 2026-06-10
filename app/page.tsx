'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from './types/todo';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { useTheme } from './contexts/ThemeContext';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  
  // App States
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true); // Tracking loading states

  // 1. Initial mounting effect to read from Local Storage safely
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Failed to parse todos from storage', error);
      }
    }
    setIsLoading(false);
  }, []);

  // 2. Synchronize changes to Local Storage whenever state modifications happen
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  // Operations handlers
  const handleAddTodo = (title: string, priority: 'low' | 'medium' | 'high', dueDate: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
      dueDate: dueDate || undefined,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: string, newTitle: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
    );
  };

  // On-the-fly dynamic filtering and querying
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'pending' && !todo.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 min-h-screen transition-colors duration-200">
      
      {/* Header View */}
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            TaskPlanner
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Manage your daily milestones seamlessly
          </p>
        </div>
        <button
          onClick={toggleTheme}
          type="button"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm hover:scale-105 transition-transform"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      <div className="space-y-6">
        {/* Form Entry Area */}
        <TodoForm onAddTodo={handleAddTodo} />

        {/* Filters and Searching Section */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-3">
          <input
            type="text"
            placeholder="🔍 Search tasks by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex border-t border-gray-100 dark:border-gray-700 pt-3 gap-1">
            {(['all', 'pending', 'completed'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex-1 text-xs py-1.5 font-medium rounded-md capitalize transition-colors ${
                  filter === type
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                {type} Tasks
              </button>
            ))}
          </div>
        </div>

        {/* Tasks Stream Interface */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-8 text-sm text-gray-400 animate-pulse">
              Loading your tasks interface...
            </div>
          ) : filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
              />
            ))
          ) : (
            /* Explicit Empty State Layout requirement */
            <div className="text-center py-12 px-4 border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-800">
              <span className="text-3xl block mb-2">📋</span>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                No tasks matches found
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-xs mx-auto">
                Try modifying your current filter setting or search queries to uncover missing entries.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}