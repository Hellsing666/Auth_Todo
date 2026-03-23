import axios from "axios";
import { useEffect, useState } from "react";


const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [editPriority, setEditPriority] = useState("medium");

  const updateTodo = async (id, description, completed, priority) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        description: description,
        completed: completed,
        priority: priority,
      });
      console.log(response.data);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, description: description, completed: completed, priority: priority }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post(`/api/todos/`, {
        description: newTodo,
        priority: newPriority,
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodo("");
      setNewPriority("medium");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`/api/todos/${id}`);
      console.log(response.data);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`/api/todos`);
        setTodos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="flex items-center justify-center p-4 pt-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          TaskFlow
        </h1>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors bg-white font-medium text-gray-700"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Add
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No todos yet. Add one above! 🎯</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                  todo.completed
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateTodo(todo.id, todo.description, !todo.completed, todo.priority || "medium")}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                />

                {/* Todo Text */}
                {editingId === todo.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (editText.trim()) {
                            updateTodo(todo.id, editText, todo.completed, editPriority);
                          }
                          setEditingId(null);
                        }
                      }}
                      autoFocus
                      className="flex-1 px-3 py-1.5 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                      className="px-3 py-1.5 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <button
                      onClick={() => {
                        if (editText.trim()) {
                          updateTodo(todo.id, editText, todo.completed, editPriority);
                        }
                        setEditingId(null);
                      }}
                      className="px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className={`flex-1 flex items-center justify-between ${
                    todo.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}>
                    <span className="truncate pr-4">{todo.description}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                      (todo.priority || 'medium') === 'high' ? 'bg-red-100 text-red-600' : 
                      (todo.priority || 'medium') === 'low' ? 'bg-green-100 text-green-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {todo.priority ? todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1) : 'Medium'}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {editingId !== todo.id && (
                    <button
                      onClick={() => {
                        setEditingId(todo.id);
                        setEditText(todo.description);
                        setEditPriority(todo.priority || "medium");
                      }}
                      className="px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {todos.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
            {todos.filter((t) => !t.completed).length} of {todos.length} tasks remaining
          </div>
        )}
      </div>
    </div>
  );
};
export default Todos;
