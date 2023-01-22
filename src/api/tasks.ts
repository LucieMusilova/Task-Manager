import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
/**
 * IMPORTANT: The code assumes that you have Type defined in src/types.ts
 * This task consist of all the needed attributes according to figma + id, this id is unique identifier from firestore
 */
import { Task } from "../types";
import { firestore } from "./firebase";

const tasksRef = collection(firestore, "tasks");

/**
 * Function asynchronly gets all the tasks from the firestore
 * @returns Promise, that the function returns array of Tasks
 */
export const getTasks = async (): Promise<Task[]> => {
  const docsSnap = await getDocs(tasksRef);
  const tasks: Task[] = [];
  docsSnap.forEach((doc) => {
    const newTask = { ...doc.data(), id: doc.id } as Task;
    tasks.push(newTask);
  });

  return tasks;
};

/**
 * Function gets the Task to be saved (this could be used for create and edit)
 * For the creation, you have to specify the task id (just use some library from the npm specified in generating ids).
 * @param task - Task
 * @returns a Promise, so you can wait for the operation to finish (for example disable button so user cannot click on a button until the operation finishes)
 */
export const saveTask = async ({ id, ...task }: Task): Promise<void> => {
  return setDoc(doc(tasksRef, id), task);
};

/**
 * Function gets the Id of a task to be deleted.
 * We do not need the whole task, we just need to specify what task to delete.
 * @param taskId - string
 * @returns a Promise, so you can wait for the operation to finish (for example disable button so user cannot click on a button until the operation finishes)
 */
export const deleteTask = async (taskId: string): Promise<void> => {
  return deleteDoc(doc(tasksRef, taskId));
};
