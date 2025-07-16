import { useEffect, useState } from "react";
import { fetchTasks, createTask, markTaskDone, deleteTasks } from "../services/api";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const tasksList = async () => {
      try {
        const res = await fetchTasks();
        setTasks(res.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };

    tasksList();
  }, [navigate, token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    try {
      await createTask(newTask);
      setNewTask({ title: "", description: "" });
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const markDone = async (id) => {
    try {
      await markTaskDone(id);
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTasks(id);
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

return (
<div className="max-w-2xl mx-auto p-6">
  {/* Header y botón de logout */}
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Mis tareas</h2>
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Cerrar sesión
    </button>
  </div>

  {/* Formulario para crear nueva tarea */}
  <form onSubmit={handleCreate} className="space-y-4 mb-6">
    <input
      type="text"
      placeholder="Título"
      value={newTask.title}
      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      required
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
    />
    <textarea
      placeholder="Descripción"
      value={newTask.description}
      onChange={(e) =>
        setNewTask({ ...newTask, description: e.target.value })
      }
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Crear tarea
    </button>
  </form>

  {/* 🧾 Listado de tareas */}
  <div className="space-y-4">
    {tasks.length === 0 ? (
      <p className="text-gray-500 text-sm">No tienes tareas aún.</p>
    ) : (
      tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDone={markDone}
          onDelete={deleteTask}
        />
      ))
    )}
  </div>
</div>

);
};

export default Tasks;