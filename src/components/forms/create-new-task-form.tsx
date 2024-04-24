// libraries
import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// icons
import { CalendarIcon, PartyPopper } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

// helpers
import { cn } from "@/lib/utils";
import { generateTaskId } from "@/helpers";
import { useLocalStorage } from "@/hooks/use-local-storage";

// redux
import { useDispatch } from "react-redux";
import { setAllTasks } from "@/store/tasks/actions";
import { closeModal } from "@/store/modal/actions";
import { CREATE_TASK } from "@/components/modals/constants";

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

export function CreateNewTaskForm() {
  const dispatch = useDispatch();

  const { setTasks, getTasks } = useLocalStorage("Tasks");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskTitle: "",
      taskDescription: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Get all tasks from local storage
      const allTasks = getTasks() || [];

      // Generate a unique task ID
      const taskId = generateTaskId();

      // Create a new task object
      const newTask = {
        id: taskId,
        ...values,
        isCompleted: false,
      };

      // Append the new task to the existing tasks or create a new array with the new task
      const updatedTasks = [...allTasks, newTask];

      // Store the updated tasks in local storage and tasks store
      dispatch(setAllTasks(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.log("CREATE_TASK_ERROR", error);
    } finally {
      // close modal
      dispatch(closeModal(CREATE_TASK));
      toast("Task created successfully", {
        icon: <PartyPopper className="w-4 h-4 text-custom-neutral" />,
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
                        format(field.value, "PP")
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
          Create Task
        </Button>
      </form>
    </Form>
  );
}
