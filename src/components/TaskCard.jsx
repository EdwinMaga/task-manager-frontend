const TaskCard = ({ task, onDone, onDelete }) => {
  return (
    <div style={styles.card}>
      <h3 style={task.done ? styles.done : {}}>{task.title}</h3>
      <p>{task.description}</p>
      <div style={styles.actions}>
        {!task.done && (
          <button onClick={() => onDone(task.id)} style={styles.btnDone}>
            ✔ Hecho
          </button>
        )}
        <button onClick={() => onDelete(task.id)} style={styles.btnDelete}>
          🗑 Eliminar
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  actions: {
    marginTop: 10,
    display: "flex",
    gap: 10,
  },
  btnDone: {
    background: "green",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  btnDelete: {
    background: "crimson",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  done: {
    textDecoration: "line-through",
    color: "gray",
  },
};

export default TaskCard;
