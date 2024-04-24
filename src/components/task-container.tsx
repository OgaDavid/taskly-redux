// ui
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/task-card";

// redux
import { openModal } from "@/store/modal/actions";
import { useDispatch } from "react-redux";
import { CREATE_TASK } from "@/components/modals/constants";

import { Task } from "@/types";

const TasksContainer = ({ tasks }: { tasks: Task[] }) => {
  const dispatch = useDispatch();

  const completedTasks = tasks.filter((task) => task.isCompleted);

  if (tasks.length < 1) {
    return (
      <div className="text-center flex flex-col gap-10 items-center">
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-lg md:text-3xl">You don't have any tasks.🙌</h3>
          <Button onClick={() => dispatch(openModal(CREATE_TASK))}>
            Create a new Task
          </Button>
        </div>
        <img
          className="invert w-28"
          src="/images/clipboard.png"
          alt="clipboard"
        />
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedPercentage = (completedTasks.length / totalTasks) * 100;

  let message = "";

  if (completedPercentage < 50) {
    message = "You can do this, c'mon!🔥";
  } else if (completedPercentage === 50) {
    message = "You're halfway there, keep going!🚀";
  } else if (completedPercentage > 50 && completedPercentage < 100) {
    message = "You're doing great, keep it up!🙌";
  } else if (completedPercentage === 100) {
    message = "Congratulations, you've completed all tasks!🎉";
  }

  return (
    <div>
      <div className="mb-5">
        <h4 className="text-sm mb-1">
          You have completed {completedTasks.length}/{tasks.length} tasks.
        </h4>
        <p className="text-xs inter-regular text-custom-neutral/75">
          {message}
        </p>
      </div>
      <div className="grid max-[475px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksContainer;
