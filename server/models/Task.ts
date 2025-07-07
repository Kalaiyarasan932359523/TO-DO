import mongoose from 'mongoose';
import { TaskStatus } from '../../shared/schema.js';

const taskSchema = new mongoose.Schema({
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

export const Task = mongoose.model("Task", taskSchema); 