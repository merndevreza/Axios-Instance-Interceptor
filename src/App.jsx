import { useState } from "react";
import data from "./data/db";
import Tasks from "./components/Tasks";
import AddEditTasks from "./components/AddEditTasks";

function App() {
  const [tasks, setTasks] = useState(data);
  const [editTask,setEditTask]=useState(null); 
  const handleAddTask=(newTask)=>{
    const nexId=tasks.length?tasks[tasks.length-1].id +1:1;
    setTasks([
      ...tasks,
      {
        ...newTask,
        id:nexId
      }
    ]) 
  }
  const handleDeleteTask=(id)=>{
    const newTasks=tasks.filter(task=>task.id!==id);
    setTasks(newTasks)
  }
  const handleEditTask=(task)=>{
const find=tasks.find(t=>t.id===task.id)
console.log(find);
  }
  
  return (
    <div className="bg-pink-100 p-5">
      <h1 className="text-2xl  border-b-2 border-black">Axios</h1>
      <Tasks tasks={tasks} onDelete={handleDeleteTask} setEditTask={setEditTask}/>
      <AddEditTasks editTask={editTask}  onAdd={handleAddTask} onEdit={handleEditTask}/>
    </div>
  );
}

export default App;
