import { Task } from "@/types";
import {
  CalendarDays,
  CircleCheck,
  Circle,
  Expand,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { cn } from "@/lib/utils";
import { getDueDate } from "@/helpers";
import { RootState } from "@/store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { setAllTasks, setCurrentTaskId } from "@/store/tasks/actions";
import { openModal } from "@/store/modal/actions";
import { EDIT_TASK, PREVIEW_TASK } from "./modals/constants";
import { useLocalStorage } from "@/hooks/use-local-storage";

const TaskCard = ({ task }: { task: Task }) => {
  const { completeTask, deleteTask } = useLocalStorage("Tasks");
  const tasks = useSelector<RootState>(
    (state) => state.task.taskList
  ) as Task[];

  const dispatch = useDispatch();

  const openEditTaskModal = () => {
    dispatch(setCurrentTaskId(task.id));
    dispatch(openModal(EDIT_TASK));
  };

  const openPreviewTaskModal = () => {
    dispatch(setCurrentTaskId(task.id));
    dispatch(openModal(PREVIEW_TASK));
  };

  const handleCompleteTask = (task: Task) => {
    completeTask(task);
    dispatch(
      setAllTasks(
        tasks.map((t: Task) =>
          t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      )
    );

    if (!task.isCompleted) toast.success("Task completed successfully.");
  };

  const handleDeleteTask = (task: Task) => {
    deleteTask(task);
    dispatch(setAllTasks(tasks.filter((t: Task) => t.id !== task.id)));
    toast("Task deleted successfully.", {
      icon: <Trash2 className="w-4 h-4 text-custom-neutral" />,
    });
  };

  return (
    <div className="border-2 flex flex-col justify-between gap-5 border-custom-accent bg-custom-primary py-4 px-4 rounded-lg">
      <div className="flex justify-between items-center">
        <TooltipWrapper
          text={task.isCompleted ? "Task Completed" : "Task Incomplete"}
        >
          <span className="relative flex h-3 w-3">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                !task.isCompleted ? "bg-yellow-400" : "bg-green-400"
              )}
            />
            <span
              className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                !task.isCompleted ? "bg-yellow-500" : "bg-green-500"
              )}
            />
          </span>
        </TooltipWrapper>
        <TooltipWrapper
          text={
            task.isCompleted
              ? "Mark task as incomplete"
              : "Mark task as complete"
          }
        >
          <div
            className="cursor-pointer"
            onClick={() => handleCompleteTask(task)}
          >
            {!task.isCompleted ? (
              <Circle className="w-5 h-5 text-custom-neutral/50 hover:text-custom-neutral" />
            ) : (
              <CircleCheck className="w-5 h-5 text-custom-neutral" />
            )}
          </div>
        </TooltipWrapper>
      </div>
      <div>
        <div className="mb-3">
          <h2>{task.taskTitle}</h2>
        </div>
        <p className="inter-regular text-sm text-custom-neutral/80">
          {task.taskDescription.length > 100
            ? `${task.taskDescription.slice(0, 100)}...`
            : task.taskDescription}
        </p>
      </div>
      <p className="inter-regular text-custom-neutral/50 flex items-center text-xs">
        Task Due:
      </p>
      <div className="flex justify-between items-center">
        <p className="inter-regular text-custom-neutral/50 flex items-center text-xs">
          <CalendarDays className="w-4 h-4 mr-1" />
          {getDueDate(task.dueDate)}
        </p>
        <div className="flex items-center gap-5">
          <TooltipWrapper text="Preview Task">
            <Expand
              onClick={openPreviewTaskModal}
              className="w-4 h-4 text-custom-neutral/50 hover:text-custom-neutral cursor-pointer"
            />
          </TooltipWrapper>
          <TooltipWrapper text="Edit Task">
            <Pencil
              onClick={openEditTaskModal}
              className="w-4 h-4 text-custom-neutral/50 hover:text-custom-neutral cursor-pointer"
            />
          </TooltipWrapper>
          <TooltipWrapper text="Delete Task">
            <Trash2
              onClick={() => handleDeleteTask(task)}
              className="w-4 h-4 text-custom-neutral/50 hover:text-custom-neutral cursor-pointer"
            />
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
