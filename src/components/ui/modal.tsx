import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreateNewTaskForm } from "@/components/forms/create-new-task-form";
import { EditTaskForm } from "@/components/forms/edit-task-form";
import TaskPreview from "@/components/task-preview";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./drawer";

// redux
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/modal/actions";

import useMediaQuery from "@/hooks/use-media-query";
import { RootState } from "@/store/reducers";

export const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>(
    (state) =>
      // @ts-expect-error err
      state.modal.isOpen
  );
  const view = useSelector<RootState>(
    (state) =>
      // @ts-expect-error err
      state.modal.view
  );

  // Function to handle the change in modal/drawer open state
  const onChange = (open: boolean) => {
    if (!open) {
      dispatch(closeModal(view as string));
    }
  };

  // Check if the device is desktop
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    // Render a dialog for desktop view
    return (
      <Dialog open={isOpen as boolean} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {view === "create-task"
                ? "New Task 🎉"
                : view === "edit-task"
                ? "Edit Task 📝"
                : "Preview Task 📝"}
            </DialogTitle>
            <DialogDescription>
              {view === "create-task"
                ? "Create a new task."
                : view === "edit-task"
                ? "Edit current task."
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div>
            {view === "create-task" ? (
              <CreateNewTaskForm />
            ) : view === "edit-task" ? (
              <EditTaskForm />
            ) : (
              <TaskPreview />
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Render a drawer for mobile view
  return (
    <Drawer open={isOpen as boolean} onOpenChange={onChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {view === "create-task"
              ? "New Task 🎉"
              : view === "edit-task"
              ? "Edit Task 📝"
              : "Preview Task 📝"}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          {view === "create-task" ? (
            <CreateNewTaskForm />
          ) : view === "edit-task" ? (
            <EditTaskForm />
          ) : (
            <TaskPreview />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
