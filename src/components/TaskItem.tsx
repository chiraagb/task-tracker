import React from "react";
import { useDispatch } from "react-redux";
import {
  toggleTask,
  removeTask,
  markCompleted,
  markIncomplete,
} from "../redux/task/taskSlice";
import {
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

interface TaskItemProps {
  task: {
    text: string;
    completed: boolean;
  };
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const dispatch = useDispatch();

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
      <div className="flex items-center">
        <span className="mr-4 text-gray-500">{index + 1}.</span>
        <span
          className={`mr-4 ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.text}
        </span>
      </div>
      <div className="space-x-3 ml-8">
        <button
          className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => dispatch(toggleTask(index))}
        >
          {task.completed ? <FaToggleOff /> : <FaToggleOn />}
        </button>
        <button
          className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => dispatch(removeTask(index))}
        >
          <FaTrash />
        </button>
        {!task.completed && (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markCompleted(index))}
          >
            <FaCheck />
          </button>
        )}
        {task.completed && (
          <button
            className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markIncomplete(index))}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
