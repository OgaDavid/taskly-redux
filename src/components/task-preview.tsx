// redux
import { RootState } from "@/store/reducers";
import { useSelector } from "react-redux";

// helpers
import { getDueDate } from "@/helpers";
import { Task } from "@/types";

const TaskPreview = () => {
  const tasks = useSelector<RootState>(
    (state) => state.task.taskList
  ) as Task[];

  const taskId = useSelector<RootState>((state) => state.task.currentTaskId);

  const task = tasks.find((task) => task.id === taskId);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2>Task Title</h2>
        <p className="text-sm pt-1 inter-regular text-custom-neutral/60">
          {task?.taskTitle}
        </p>
      </div>
      <div>
        <h2>Task Description</h2>
        <p className="text-sm pt-1 inter-regular text-custom-neutral/60">
          {task?.taskDescription}
        </p>
      </div>
      <div>
        <h2>Task is due on</h2>
        <p className="text-sm pt-1 inter-regular text-custom-neutral/60">
          {getDueDate(task?.dueDate as string)}
        </p>
      </div>
    </div>
  );
};

export default TaskPreview;
