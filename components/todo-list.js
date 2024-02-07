"use client";
import React, { useEffect, useState } from "react";

export default function ToDoList() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    try {
      const res = await fetch("/data.json");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (newTodo.trim()) {
      try {
        const newTodoItem = {
          id: Date.now(),
          text: newTodo,
        };

        setTodos([...todos, newTodoItem]);

        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My List</h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <ul
            key={todo.id}
            className="flex justify-between bg-gray-700 p-2 rounded-md shadow-sm"
          >
            {todo.text}
            <button className="" onClick={() => deleteTodo(todo.id)}>
              ❌
            </button>
          </ul>
        ))}
      </ul>
      <form
        onSubmit={addTodo}
        className="mt-4 flex  items-center justify-center gap-x-3"
      >
        <input
          value={newTodo}
          type="text"
          placeholder="Add a new todo"
          className="w-full p-2 border rounded-md shadow-sm bg-gray-800"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          type="submit"
          className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </form>
    </div>
  );
}
