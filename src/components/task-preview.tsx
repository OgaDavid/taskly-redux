import { getDueDate } from "@/helpers";
import { RootState } from "@/store/reducers";
import { useSelector } from "react-redux";

const TaskPreview = () => {
  const taskId = useSelector<RootState>(
    (state) =>
      // @ts-expect-error err
      state.modal.previewTaskId
  );
  const tasks = useSelector<RootState>(
    (state) =>
      // @ts-expect-error err
      state.task.taskList
  );

  // @ts-expect-error err
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
