const TaskCard = ({ task, onDone, onDelete }) => {
  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <h3 className={`text-lg font-semibold ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        {task.title}
      </h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex gap-2 mt-4">
        {!task.done && (
          <button
            onClick={() => onDone(task.id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          >
            ✔ Hecho
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          🗑 Eliminar
        </button>
      </div>
    </div>

  );
};

export default TaskCard;
