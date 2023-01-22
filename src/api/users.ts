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
import { User } from "../types";
import { firestore } from "./firebase";

const usersRef = collection(firestore, "users");

/**
 * Function asynchronly gets all the tasks from the firestore
 * @returns Promise, that the function returns array of Tasks
 */
export const getUsers = async (): Promise<User[]> => {
  const docsSnap = await getDocs(usersRef);
  const users: User[] = [];
  docsSnap.forEach((doc) => {
    const newUser = { ...doc.data(), id: doc.id } as User;
    users.push(newUser);
  });

  return users;
};

/**
 * Function gets the Task to be saved (this could be used for create and edit)
 * For the creation, you have to specify the task id (just use some library from the npm specified in generating ids).
 * @param user - Task
 * @returns a Promise, so you can wait for the operation to finish (for example disable button so user cannot click on a button until the operation finishes)
 */
export const saveUser = async ({ id, ...user }: User): Promise<void> => {
  return setDoc(doc(usersRef, id), user);
};

/**
 * Function gets the Id of a task to be deleted.
 * We do not need the whole task, we just need to specify what task to delete.
 * @param userId - string
 * @returns a Promise, so you can wait for the operation to finish (for example disable button so user cannot click on a button until the operation finishes)
 */
export const deleteUser = async (userId: string): Promise<void> => {
  return deleteDoc(doc(usersRef, userId));
};
