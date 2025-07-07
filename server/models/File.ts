import mongoose, { Document, Model } from "mongoose";

// Interface for File document
export interface IFile extends Document {
  filename: string;
  filepath: string;
  size: number;
  mimetype: string;
  project_id?: mongoose.Types.ObjectId;
  task_id?: mongoose.Types.ObjectId;
  uploader_id: mongoose.Types.ObjectId;
  uploaded_at: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for File model with static methods
export interface IFileModel extends Model<IFile> {
  find(conditions?: any): Promise<IFile[]>;
  findById(id: any): Promise<IFile | null>;
  findByIdAndUpdate(id: any, update: any, options?: any): Promise<IFile | null>;
  findByIdAndDelete(id: any): Promise<IFile | null>;
  create(file: any): Promise<IFile>;
  countDocuments(conditions?: any): Promise<number>;
}

const fileSchema = new mongoose.Schema<IFile>({
  filename: {
    type: String,
    required: true,
    trim: true
  },
  filepath: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  uploader_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploaded_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add any methods or statics here if needed
fileSchema.methods.toJSON = function() {
  const file = this.toObject();
  return file;
};

export const File = mongoose.model<IFile, IFileModel>("File", fileSchema); 