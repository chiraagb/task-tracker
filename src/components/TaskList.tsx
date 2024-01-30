import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { RootState } from "../redux/store";

const TaskList: React.FC = () => {
  const filteredTasks = useSelector((state: RootState) => {
    const tasks = state.task.tasks;
    const filter = state.task.filter;
    const searchTerm = state.task.searchTerm.toLowerCase();

    return tasks.filter((task) => {
      const matchesFilter =
        (filter === "COMPLETED" && task.completed) ||
        (filter === "INCOMPLETE" && !task.completed) ||
        filter === "ALL";

      const matchesSearch = task.text.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  });

  console.log("Filtered Tasks:", filteredTasks);

  return (
    <ul>
      <li className="my-2 text-sm italic">All Your Notes Here...</li>
      {filteredTasks.map((task, index: number) => (
        <TaskItem key={index} task={task} index={index} />
      ))}
    </ul>
  );
};

export default TaskList;
