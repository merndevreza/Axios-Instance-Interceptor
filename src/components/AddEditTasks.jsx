import { useEffect, useState } from "react";

const AddEditTasks = ({ onAdd, editTask,onEdit }) => {
  const [change, setChange] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChange({
      ...change,
      [name]: value,
    });
  };
  useEffect(() => {
    if (editTask) {
      setChange({
        title: editTask.title,
        body: editTask.body,
      });
    } else {
      setChange({
        title: "",
        body: "",
      });
    }
  }, [editTask]);
  return (
    <div>
      <h2 className="text-2xl border-b-2 border-black">
        {editTask ? "Edit Task" : "Add Task"}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editTask) {
            onEdit({
              id:editTask.id,
              ...change
            })
          } else {
            onAdd(change);
            setChange({
              title: "",
              body: "",
            });
          }
        }}
      >
        <input
          type="text"
          name="title"
          value={change.title}
          placeholder="title"
          className="w-full p-2 my-3"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="body"
          value={change.body}
          onChange={(e) => handleChange(e)}
          placeholder="Body"
          className="w-full p-2 my-3"
        />
        {editTask ? (
          <button className="bg-green-500 py-1 rounded px-3" type="submit">
            Update
          </button>
        ) : (
          <button className="bg-green-500 py-1 rounded px-3" type="submit">
            Add
          </button>
        )}
      </form>
    </div>
  );
};

export default AddEditTasks;
