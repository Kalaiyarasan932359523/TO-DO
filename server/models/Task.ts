import mongoose, { Document, Model, Query } from "mongoose";
import { TaskStatus } from '../../shared/schema';

// Interface for Task document
export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: Date;
  project_id?: mongoose.Types.ObjectId;
  assignee_id?: mongoose.Types.ObjectId;
  creator_id: mongoose.Types.ObjectId;
  shared_with: mongoose.Types.ObjectId[];
  completed_at?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Task model with static methods
export interface ITaskModel extends Model<ITask> {
  find(conditions?: any): Query<ITask[], ITask>;
  findById(id: any): Query<ITask | null, ITask>;
  findByIdAndUpdate(id: any, update: any, options?: any): Query<ITask | null, ITask>;
  findByIdAndDelete(id: any): Query<ITask | null, ITask>;
  create(task: any): Promise<ITask>;
  countDocuments(conditions?: any): Query<number, ITask>;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  deadline: {
    type: Date
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  assignee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shared_with: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  completed_at: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Add any methods or statics here if needed
taskSchema.methods.markAsCompleted = function() {
  this.status = TaskStatus.COMPLETED;
  this.completed_at = new Date();
  return this.save();
};

export const Task = mongoose.model<ITask, ITaskModel>("Task", taskSchema); 