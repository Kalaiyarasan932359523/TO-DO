// Client-specific types to avoid shared directory dependencies

export enum UserRole {
  ADMIN = "admin",
  TEAM_MEMBER = "team_member",
  CLIENT = "client"
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  COMPLETED = "completed"
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export enum ProjectStatus {
  PLANNING = "planning",
  ON_TRACK = "on_track",
  AT_RISK = "at_risk",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed"
}

// Type definitions for client use
export interface User {
  _id?: string;
  username: string;
  password?: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  googleId?: string;
}

export interface Project {
  _id?: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  deadline?: Date;
  owner_id: string;
  members?: string[];
}

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline?: Date;
  project_id?: string;
  assignee_id?: string;
  creator_id: string;
  shared_with?: string[];
  completed_at?: Date;
}

export interface Comment {
  _id?: string;
  content: string;
  task_id?: string;
  project_id?: string;
  user_id: string;
  created_at: Date;
}

export interface File {
  _id?: string;
  filename: string;
  filepath: string;
  size: number;
  mimetype: string;
  project_id?: string;
  task_id?: string;
  uploader_id: string;
  uploaded_at: Date;
}

// Define types for API responses that include relations
export interface ProjectWithStats extends Project {
  taskCount?: number;
  completedTaskCount?: number;
  memberCount?: number;
}

export interface TaskWithRelations extends Task {
  project?: Project;
  assignee?: User;
  creator?: User;
  comments?: Comment[];
  files?: File[];
}

export interface ProjectWithMembers extends Project {
  members?: User[];
  tasks?: Task[];
}

export interface UserWithTasks extends User {
  assignedTasks?: Task[];
}

// Types for dashboard statistics
export interface DashboardStats {
  totalProjects: number;
  tasksInProgress: number;
  completedTasks: number;
  teamMembers: number;
  newProjectsThisMonth: number;
  dueSoonTasks: number;
  completedTasksThisWeek: number;
  onlineUsers: number;
}

// Types for activity feeds
export interface ActivityWithUser {
  id: number;
  action: string;
  description: string;
  created_at: string;
  user?: {
    id: number;
    name: string;
    username: string;
    avatar?: string;
  };
  project_id?: number;
  task_id?: number;
}

// Type for the filter options used in tasks
export type TaskFilter = 'all' | 'todo' | 'in_progress' | 'review' | 'completed';
