import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import TaskList from "./TaskList";
import FilterButtons from "./FilterButton";
import { BsSearch, BsPlus } from "react-icons/bs";
import { addTask, updateSearchTerm } from "../redux/task/taskSlice";

const Task: React.FC = () => {
  const dispatch = useDispatch();
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAddTask = (text: string) => {
    dispatch(addTask(text));
  };

  const handleAddTaskClick = () => {
    if (newTaskText.trim() !== "") {
      handleAddTask(newTaskText.trim());
      setNewTaskText("");
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
      <h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">
        TASK TRACKER APP
      </h2>
      <div className="flex items-center mb-4">
        <input
          id="addTaskInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add Task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTaskClick}
        >
          <BsPlus size={20} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Tasks"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      <TaskList />
    </div>
  );
};

export default Task;
