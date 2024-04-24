import { useEffect } from "react";
import SiteHeader from "@/components/site-header";
import MiniHeader from "@/components/mini-header";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { setAllTasks } from "@/store/tasks/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import TasksContainer from "@/components/task-container";
import { Task } from "./types";

function App() {
  const dispatch = useDispatch();

  const tasks = useSelector<RootState>((state) => state.task.taskList);
  const { getTasks } = useLocalStorage("Tasks");

  useEffect(() => {
    const allTasks = getTasks() || [];
    dispatch(setAllTasks(allTasks)); // Set tasks to store // Add retrieved tasks to Tasks state
  }, []);

  return (
    <div>
      <SiteHeader />
      <div className="wrapper pt-10">
        <MiniHeader />
        <div className="mt-10">
          <TasksContainer tasks={tasks as Task[]} />
        </div>
      </div>
      <ModalProvider />
      <ToastProvider />
    </div>
  );
}

export default App;
