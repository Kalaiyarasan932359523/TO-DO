import mongoose from 'mongoose';
import { commentSchema } from '../../shared/schema.js';

const commentSchemaMongoose = new mongoose.Schema({
  content: { type: String, required: true },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
}, {
  timestamps: true
});

export class Comment {
  constructor(content, task_id, project_id, user_id) {
    this.content = content;
    this.task_id = task_id;
    this.project_id = project_id;
    this.user_id = user_id;
  }

  async save() {
    const comment = new mongoose.model('Comment', commentSchemaMongoose)(this);
    await comment.save();
    return comment;
  }
}

export const Comment = mongoose.model('Comment', commentSchemaMongoose); 