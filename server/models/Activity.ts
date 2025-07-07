import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['task_created', 'task_updated', 'task_completed', 'comment_added', 'file_uploaded', 'project_created', 'project_updated']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Add any methods or statics here if needed
activitySchema.methods.toJSON = function() {
  const activity = this.toObject();
  return activity;
};

export const Activity = mongoose.model("Activity", activitySchema); 