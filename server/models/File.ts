import mongoose from 'mongoose';
import { fileSchema } from '../../shared/schema.js';

const fileSchemaMongoose = new mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  uploader_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploaded_at: { type: Date, default: Date.now },
}, {
  timestamps: true
});

export class File {
  constructor(filename, filepath, size, mimetype, project_id, task_id, uploader_id, uploaded_at) {
    this.filename = filename;
    this.filepath = filepath;
    this.size = size;
    this.mimetype = mimetype;
    this.project_id = project_id;
    this.task_id = task_id;
    this.uploader_id = uploader_id;
    this.uploaded_at = uploaded_at;
  }
}

export const FileModel = mongoose.model('File', fileSchemaMongoose); 