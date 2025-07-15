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

const styles = {
  logoutButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

return (
  <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <h2>Mis tareas</h2>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Cerrar sesión
      </button>
    </div>

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