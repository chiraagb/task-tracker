import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  text: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  filter: string;
  searchTerm: string;
}

const initialState: TaskState = {
  tasks: [],
  filter: "ALL",
  searchTerm: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({ text: action.payload, completed: false });
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks[action.payload];
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks.splice(action.payload, 1);
    },
    markCompleted: (state, action: PayloadAction<number>) => {
      const task = state.tasks[action.payload];
      if (task) {
        task.completed = true;
      }
    },
    markIncomplete: (state, action: PayloadAction<number>) => {
      const task = state.tasks[action.payload];
      if (task) {
        task.completed = false;
      }
    },
    filterTasks: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    markAllCompleted: (state) => {
      state.tasks.forEach((task) => (task.completed = true));
    },
    reorderTasks: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const updatedTasks = [...state.tasks];
      const [draggedTask] = updatedTasks.splice(dragIndex, 1);
      updatedTasks.splice(hoverIndex, 0, draggedTask);
      state.tasks = updatedTasks;
    },
  },
});

export const {
  addTask,
  toggleTask,
  removeTask,
  markCompleted,
  markIncomplete,
  filterTasks,
  updateSearchTerm,
  markAllCompleted,
  reorderTasks,
} = taskSlice.actions;

export const taskReducer = taskSlice.reducer;
export type { Task, TaskState };
