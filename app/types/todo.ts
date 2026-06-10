export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high'; 
  dueDate?: string;                    
}