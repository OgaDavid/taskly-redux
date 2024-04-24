import { Task } from "@/types";

/**
 * Custom hook for interacting with the local storage.
 * @param key - The key to use for storing and retrieving data from local storage.
 * @returns An object containing functions to set and get data from local storage.
 */
export function useLocalStorage(key: string) {
  const setTasks = (task: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(task));
    } catch (error) {
      console.log("SET_TASKS", error);
    }
  };

  const getTasks = () => {
    try {
      const tasks = window.localStorage.getItem(key);
      if (tasks) {
        return JSON.parse(tasks);
      }
    } catch (error) {
      console.log("GET_TASKS", error);
    }
  };

  const completeTask = (task: Task) => {
    const allTasks = getTasks();
    const updatedTasks = allTasks.map((t: Task) => {
      if (t.id === task.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (task: Task) => {
    const allTasks = getTasks();
    const updatedTasks = allTasks.filter((t: Task) => t.id !== task.id);
    setTasks(updatedTasks);
  };

  return { setTasks, getTasks, completeTask, deleteTask };
}
