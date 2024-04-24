// libraries
import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// icons
import { CalendarIcon, ClipboardPenLine } from "lucide-react";

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ui
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

// helpers
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

// redux
import { EDIT_TASK } from "@/components/modals/constants";
import { RootState } from "@/store/reducers";
import { closeModal } from "@/store/modal/actions";
import { setAllTasks } from "@/store/tasks/actions";
import { useDispatch, useSelector } from "react-redux";

import { Task } from "@/types";

const formSchema = z.object({
  taskTitle: z.string().min(2, {
    message: "Task title must be at least 2 characters.",
  }),
  taskDescription: z
    .string()
    .min(2, {
      message: "Task description must be at least 2 characters.",
    })
    .max(150, {
      message: "Task Description is too long.",
    }),
  dueDate: z.date({
    required_error: "Select a due date for your task.",
  }),
});

export function EditTaskForm() {
  const dispatch = useDispatch();

  const currentTaskId = useSelector<RootState>(
    (state) => state.task.currentTaskId
  );

  const { setTasks, getTasks } = useLocalStorage("Tasks");

  const allTasks = getTasks() || [];
  const task = allTasks.find((task: Task) => task.id === currentTaskId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskTitle: task?.taskTitle || "",
      taskDescription: task?.taskDescription || "",
      dueDate: new Date(task?.dueDate) || null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Find the index of the task to edit
      const taskIndex = allTasks.findIndex(
        (task: Task) => task.id === currentTaskId
      );
      // Update the task with the new values
      allTasks[taskIndex] = {
        ...allTasks[taskIndex],
        ...values,
      };
      // Set the updated tasks to local storage
      setTasks(allTasks);
      // Set the updated tasks to the store
      dispatch(setAllTasks(allTasks));
    } catch (error) {
      console.log("EDIT_TASK_ERROR", error);
    } finally {
      // close modal
      dispatch(closeModal(EDIT_TASK));
      toast("Task edited successfully", {
        icon: <ClipboardPenLine className="w-4 h-4 text-custom-neutral" />,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="taskTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taskDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter a task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Task Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left inter-regular font-normal",
                        !field.value && "text-custom-neutral/35"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="bg-custom-secondary rounded-lg border-2 border-custom-accent"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" variant="ghost" type="submit">
          Edit Task
        </Button>
      </form>
    </Form>
  );
}
