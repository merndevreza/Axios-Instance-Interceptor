
const Tasks = ({tasks,onDelete,setEditTask}) => {
   return (
      <ul>
        {tasks.map((task) => (
          <ol key={task.id}>
            {task.title}
            <button onClick={()=>onDelete(task.id)} className=" p-2 m-4 bg-red-600">Delete</button>
            <button onClick={()=>setEditTask(task)} className="bg-yellow-600 p-2 m-4">edit</button>
          </ol>
        ))}
      </ul>
   );
};

export default Tasks;