import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { reorderTasks, Task } from "../redux/task/taskSlice";
import TaskItem from "./TaskItem";

interface DraggableTaskItemProps {
  task: Task;
  index: number;
}

const DraggableTaskItem: React.FC<DraggableTaskItemProps> = ({
  task,
  index,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { type: "TASK", index },
    collect: (monitor) =>
      ({
        isDragging: monitor.isDragging(),
      } as { isDragging: boolean }),
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (draggedItem: { type: string; index: number }) => {
      if (draggedItem.index !== index) {
        dispatch(
          reorderTasks({ dragIndex: draggedItem.index, hoverIndex: index })
        );
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <TaskItem key={index} task={task} index={index} />
    </li>
  );
};

export default DraggableTaskItem;
