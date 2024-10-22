"use client";
import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import DeleteBookmarkButton from "./DeleteBookmarkButton";
import {
  ArrowBigDown,
  ChevronDown,
  Edit,
  SquareCheck,
  Trash,
} from "lucide-react";
import { Input } from "./ui/input";
import { Bookmark, Todo, User } from "@prisma/client";

export interface bookmarkRowProps extends Bookmark {
  user: User;
  todos: Todo[];
}
export default function BookmarkRow({
  bookmark,
}: {
  bookmark: bookmarkRowProps;
}) {
  const [todos, setTodos] = useState(bookmark.todos || []);
  const [title, setTitle] = useState("");
  const [edittitle, setEditTitle] = useState("");
  const [isEditing, setIsEditing] = useState("");

  const addTodo = async () => {
    const newTodo = {
      title: title,
      description: "A description",
      completed: false,
      bookmarkId: bookmark.id,
    };

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    // console.log(response)
    const createdTodo = await response.json();
    setTodos((prev) => [...prev, createdTodo]);
  };

  const onDelete = async (todoId: string) => {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Update the local state to remove the deleted todo
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    } else {
      console.error("Failed to delete the todo.");
    }
  };

  const onEdit = async (todoId: string) => {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: edittitle }),
    });

    if (response.ok) {
      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((item) =>
          item.id === todoId ? { ...item, title: updatedTodo.title } : item
        )
      );
      setIsEditing("");
    } else {
      console.error("Failed to edit the todo.");
    }
  };

  const toggleTodoCompletion = async (todoId: string, completed: boolean) => {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });

    if (response.ok) {
      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((item) =>
          item.id === todoId
            ? { ...item, completed: updatedTodo.completed }
            : item
        )
      );
    } else {
      console.error("Failed to update the todo status.");
    }
  };

  return (
    <DropdownMenu>
      <TableRow className="cursor-pointer">
        <TableCell>
          <a
            href={bookmark.url || "#"}
            target="_blank"
            className="text-blue-500 underline"
            rel="noopener noreferrer"
          >
            {bookmark.name}
          </a>
        </TableCell>
        <TableCell>{bookmark.description || "No description"}</TableCell>
        <TableCell>
          <DeleteBookmarkButton bookmarkId={bookmark.id} />
        </TableCell>

        <TableCell>
          <DropdownMenuTrigger asChild>
            {/* <ChevronDown className="h-4 w-4" /> */}
            <Button> Todos</Button>
          </DropdownMenuTrigger>
        </TableCell>
      </TableRow>

      <DropdownMenuContent className="w-screen max-w-lg p-4 bg-gray-100 shadow-lg text-black">
        <h4 className="font-bold mb-2">Todos</h4>

        {/* Todos List */}
        {todos.length ? (
          todos.map((todo) => (
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              key={todo.id}
              className="p-2 border-b flex justify-between items-center"
            >
              <div className="flex items-center">
                {/* Checkbox for marking todo as completed */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    toggleTodoCompletion(todo.id, !todo.completed)
                  }
                  className="mr-2"
                />
                {isEditing === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={edittitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border rounded p-1 mr-2 bg-gray-100 text-black"
                      autoFocus
                    />
                    <Button
                      className="bg-green-500"
                      size={"sm"}
                      onClick={() => onEdit(todo.id)}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <span>{todo.title}</span>
                )}
              </div>

              <div className="flex gap-2">
                {/* Edit button */}
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  onClick={(e) => {
                    setIsEditing(todo.id === isEditing ? "" : todo.id);
                    setEditTitle(todo.title);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                {/* Delete button */}
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  onClick={() => {
                    onDelete(todo.id);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="p-2">No todos found.</DropdownMenuItem>
        )}

        <div className="flex justify-between items-center mt-4">
          <Input
            placeholder="Add your todo"
            className="mr-2"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {/* Add Todo Button */}
          <Button
            size="sm"
            onClick={() => {
              addTodo();
              setTitle("");
            }}
          >
            Add Todo
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
