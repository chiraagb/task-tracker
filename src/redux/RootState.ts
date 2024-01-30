// RootState.ts
import { TaskState } from "./task/taskSlice";

export interface RootState {
  task: TaskState;
  // Add other slices if you have them
}
