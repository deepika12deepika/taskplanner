export interface Todo {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
}