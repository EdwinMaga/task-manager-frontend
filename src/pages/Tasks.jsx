import { useEffect, useState } from "react";
import { fetchTasks, createTask, markTaskDone, deleteTasks } from "../services/api";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const tasksList = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    tasksList();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    await createTask(newTask);
    setNewTask({ title: "", description: "" });
    tasksList();
  };

  const markDone = async (id) => {
    await markTaskDone(id);
    tasksList();
  };

  const deleteTask = async (id) => {
    await deleteTasks(id);
    tasksList();
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Mis tareas</h2>
      <form onSubmit={handleCreate} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Título"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
          style={{ padding: 8, width: "100%", marginBottom: 8 }}
        />
        <textarea
          placeholder="Descripción"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          style={{ padding: 8, width: "100%" }}
        />
        <button type="submit" style={{ padding: 10, marginTop: 10 }}>
          Crear tarea
        </button>
      </form>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDone={markDone}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
};

export default Tasks;
