'use client';

import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export default function TodoItem({ todo, onToggleComplete, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle);
      setIsEditing(false);
    }
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm gap-4 transition-all duration-200 hover:shadow-md ${todo.completed ? 'opacity-75' : ''}`}>
      
      <div className="flex items-start gap-3 flex-1">
        {/* Checkbox to complete/pending */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleSave} className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 font-medium">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="text-xs bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 font-medium">
                Cancel
              </button>
            </div>
          ) : (
            <p className={`text-sm font-medium break-words transition-all ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
              {todo.title}
            </p>
          )}

          {/* Badges for Priority and Due Date */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
            {todo.dueDate && (
              <span className="text-[11px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 py-0.5 rounded font-medium">
                📅 Due: {todo.dueDate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100 dark:border-gray-700">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            ✏️ Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}