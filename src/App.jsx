import { useEffect, useState } from "react";
// import data from "./data/db";
import Tasks from "./components/Tasks";
import AddEditTasks from "./components/AddEditTasks"; 
import axiosInstance from "./axios/axiosInstance";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [error, setError] = useState(null);

  const handleAddTask = async (newTask) => {
    try {
      const nexId = tasks.length ? Number(tasks[tasks.length - 1].id) + 1 : 1;
      const newTaskWithId = { id: nexId.toString(), ...newTask };
      const response = await axiosInstance.post(
        "/tasks",
        newTaskWithId
      );
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDeleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleEditTask = async (task) => {
    try {
      const response = await axiosInstance.patch(
        `/tasks/${task.id}`,
        task
      );
      const UpdatedTasks = tasks.map((t) =>
        t.id === response.data.id ? response.data : t
      );
      setTasks(UpdatedTasks);
      setEditTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get("/taskss");
        if (response && response.data) {
          setTasks(response.data);
        }
        // Here we don't need to explicitly throw the error, because it is an asynchronous function in try-catch block. It will automatically throw error to the catch block
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, []);
  return (
    <div className="bg-pink-100 p-5">
      <h1 className="text-2xl  border-b-2 border-black">Axios</h1>
      <Tasks
        tasks={tasks}
        onDelete={handleDeleteTask}
        setEditTask={setEditTask}
      />
      <AddEditTasks
        editTask={editTask}
        onAdd={handleAddTask}
        onEdit={handleEditTask}
      />
      {error && <div className="bg-red-500 p-5 mt-5">{error}</div>}
    </div>
  );
}

export default App;
