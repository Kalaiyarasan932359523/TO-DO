import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
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

export const Comment = mongoose.model("Comment", commentSchema); 