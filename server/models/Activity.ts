import mongoose, { Document, Model } from "mongoose";

// Interface for Activity document
export interface IActivity extends Document {
  type: 'task_created' | 'task_updated' | 'task_completed' | 'comment_added' | 'file_uploaded' | 'project_created' | 'project_updated';
  description: string;
  user_id: mongoose.Types.ObjectId;
  task_id?: mongoose.Types.ObjectId;
  project_id?: mongoose.Types.ObjectId;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Activity model with static methods
export interface IActivityModel extends Model<IActivity> {
  find(conditions?: any): Promise<IActivity[]>;
  findById(id: any): Promise<IActivity | null>;
  findByIdAndUpdate(id: any, update: any, options?: any): Promise<IActivity | null>;
  findByIdAndDelete(id: any): Promise<IActivity | null>;
  create(activity: any): Promise<IActivity>;
  countDocuments(conditions?: any): Promise<number>;
}

const activitySchema = new mongoose.Schema<IActivity>({
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

export const Activity = mongoose.model<IActivity, IActivityModel>("Activity", activitySchema); 