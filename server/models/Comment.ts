import mongoose, { Document } from "mongoose";

// Interface for Comment document
export interface IComment extends Document {
  content: string;
  task_id?: mongoose.Types.ObjectId;
  project_id?: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema<IComment>({
  content: {
    type: String,
    required: true,
    trim: true
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add any methods or statics here if needed
commentSchema.methods.toJSON = function() {
  const comment = this.toObject();
  return comment;
};

export const Comment = mongoose.model<IComment>("Comment", commentSchema); 