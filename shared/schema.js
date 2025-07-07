import { z } from "zod";
// User roles
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["TEAM_MEMBER"] = "team_member";
    UserRole["CLIENT"] = "client";
})(UserRole || (UserRole = {}));
// Task statuses
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "todo";
    TaskStatus["IN_PROGRESS"] = "in_progress";
    TaskStatus["REVIEW"] = "review";
    TaskStatus["COMPLETED"] = "completed";
})(TaskStatus || (TaskStatus = {}));
// Task priorities
export var TaskPriority;
(function (TaskPriority) {
    TaskPriority["LOW"] = "low";
    TaskPriority["MEDIUM"] = "medium";
    TaskPriority["HIGH"] = "high";
})(TaskPriority || (TaskPriority = {}));
// Project statuses
export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PLANNING"] = "planning";
    ProjectStatus["ON_TRACK"] = "on_track";
    ProjectStatus["AT_RISK"] = "at_risk";
    ProjectStatus["IN_PROGRESS"] = "in_progress";
    ProjectStatus["COMPLETED"] = "completed";
})(ProjectStatus || (ProjectStatus = {}));
// MongoDB-compatible Zod schemas
export const userSchema = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.nativeEnum(UserRole).default(UserRole.TEAM_MEMBER),
    avatar: z.string().optional(),
    googleId: z.string().optional(),
});
export const projectSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    status: z.nativeEnum(ProjectStatus).default(ProjectStatus.PLANNING),
    deadline: z.date().optional(),
    owner_id: z.string(), // MongoDB ObjectId as string
    members: z.array(z.string()).optional(), // Array of MongoDB ObjectIds
});
export const taskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.TODO),
    priority: z.nativeEnum(TaskPriority).default(TaskPriority.MEDIUM),
    deadline: z.date().optional(),
    project_id: z.string().optional(), // MongoDB ObjectId as string
    assignee_id: z.string().optional(), // MongoDB ObjectId as string
    creator_id: z.string(), // MongoDB ObjectId as string
    shared_with: z.array(z.string()).optional(), // Array of MongoDB ObjectIds
    completed_at: z.date().optional(),
});
export const commentSchema = z.object({
    content: z.string(),
    task_id: z.string().optional(), // MongoDB ObjectId as string
    project_id: z.string().optional(), // MongoDB ObjectId as string
    user_id: z.string(), // MongoDB ObjectId as string
    created_at: z.date().default(() => new Date()),
});
export const activitySchema = z.object({
    action: z.string(),
    description: z.string(),
    user_id: z.string(), // MongoDB ObjectId as string
    project_id: z.string().optional(), // MongoDB ObjectId as string
    task_id: z.string().optional(), // MongoDB ObjectId as string
    created_at: z.date().default(() => new Date()),
});
export const fileSchema = z.object({
    filename: z.string(),
    filepath: z.string(),
    size: z.number(),
    mimetype: z.string(),
    project_id: z.string().optional(), // MongoDB ObjectId as string
    task_id: z.string().optional(), // MongoDB ObjectId as string
    uploader_id: z.string(), // MongoDB ObjectId as string
    uploaded_at: z.date().default(() => new Date()),
});
export const feedbackSchema = z.object({
    category: z.string(),
    type: z.string(),
    rating: z.number(),
    message: z.string(),
    anonymous: z.boolean().default(true),
    user_id: z.string().optional(), // MongoDB ObjectId as string
    created_at: z.date().default(() => new Date()),
    status: z.string().default("pending"),
});
