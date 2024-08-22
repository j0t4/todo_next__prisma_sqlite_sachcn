"use client"
import React, { useState, useEffect } from 'react';
import { db } from '../server/db';
import { type Todo } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '././../components/ui/card'; 
import { Input } from '././../components/ui/input'; 
import { Button } from '././../components/ui/button'; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '././../components/ui/alert-dialog'; 

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch initial todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  // Add a new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return; 

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newTodo }),
    });
    setNewTodo('');
    await fetchTodos();
  };

  // Toggle todo completion
  const toggleTodo = async (id: string, completed: boolean) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !completed }),
    });
    await fetchTodos();
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    await fetchTodos();
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
            <> 
              <div className="flex mb-4">
                <Input
                  type="text"
                  placeholder="Add a new todo..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  className="mr-2"
                />
                <Button onClick={addTodo}>Add</Button>
              </div>

              <ul>
                {todos.map((todo) => (
                  <li key={todo.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id, todo.completed)}
                      className="mr-2"
                    />
                    <span className={todo.completed ? 'line-through' : ''}>
                      {todo.content}
                    </span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Todo</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this todo?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteTodo(todo.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                  </li>
                ))}
              </ul> 
              </>
        </CardContent>
      </Card>
    </div>
  );
}