import mongoose, { Document, Model } from "mongoose";
import { ProjectStatus } from '../../shared/schema.js';

// Interface for Project document
export interface IProject extends Document {
  name: string;
  description?: string;
  status: ProjectStatus;
  deadline?: Date;
  owner_id: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Project model with static methods
export interface IProjectModel extends Model<IProject> {
  find(conditions?: any): Promise<IProject[]>;
  findById(id: any): Promise<IProject | null>;
  findByIdAndUpdate(id: any, update: any, options?: any): Promise<IProject | null>;
  findByIdAndDelete(id: any): Promise<IProject | null>;
  create(project: any): Promise<IProject>;
  countDocuments(conditions?: any): Promise<number>;
}

const projectSchema = new mongoose.Schema<IProject>({
  name: {
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
    enum: Object.values(ProjectStatus),
    default: ProjectStatus.ACTIVE
  },
  deadline: {
    type: Date
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Add any methods or statics here if needed
projectSchema.methods.addMember = function(userId: string) {
  if (!this.members.includes(userId)) {
    this.members.push(userId);
  }
  return this.save();
};

projectSchema.methods.removeMember = function(userId: string) {
  this.members = this.members.filter((id: string) => id.toString() !== userId);
  return this.save();
};

export const Project = mongoose.model<IProject, IProjectModel>("Project", projectSchema); 