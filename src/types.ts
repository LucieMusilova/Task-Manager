export enum Type {
  "TASK" = "TASK",
  "BUG" = "BUG",
  "STORY" = "STORY",
}

export enum Priority {
  "HIGH" = "HIGH",
  "MEDIUM" = "MEDIUM",
  "LOW" = "LOW",
}

export interface ColumnTasks {
  id: "title" | "type" | "priority" | "description" | "action" | "owner";
  label: string;
  fontWeight: string;
  maxWidth?: number;
  align?: "right";
}

export interface ColumnUsers {
  id: "firstname" | "lastname" | "email" | "phone" | "action";
  label: string;
  fontWeight: string;
  maxWidth?: number;
  align?: "right";
}

export interface Task {
  id: string;
  create: Date;
  title: string;
  type: Type | "";
  priority: Priority | "";
  owner: string;
  description: string;
}

export interface User {
  id: string;
  create: Date;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}
