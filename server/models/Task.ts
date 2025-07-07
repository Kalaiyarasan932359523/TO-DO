import mongoose from 'mongoose';
import { taskSchema, TaskStatus, TaskPriority } from '../../shared/schema.js';

const taskSchemaMongoose = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.TODO },
  priority: { type: String, enum: Object.values(TaskPriority), default: TaskPriority.MEDIUM },
  deadline: { type: Date },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shared_with: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  completed_at: { type: Date },
}, {
  timestamps: true
});

export class Task {
  constructor(title, description, status, priority, deadline, project_id, assignee_id, creator_id, shared_with, completed_at) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.deadline = deadline;
    this.project_id = project_id;
    this.assignee_id = assignee_id;
    this.creator_id = creator_id;
    this.shared_with = shared_with;
    this.completed_at = completed_at;
  }
}

export const Task = mongoose.model('Task', taskSchemaMongoose); 