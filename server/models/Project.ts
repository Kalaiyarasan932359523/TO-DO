import mongoose from 'mongoose';
import { projectSchema, ProjectStatus } from '../../shared/schema.js';

const projectSchemaMongoose = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: Object.values(ProjectStatus), default: ProjectStatus.PLANNING },
  deadline: { type: Date },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true
});

export class Project {
  constructor(name, description, status, deadline, owner_id, members) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.deadline = deadline;
    this.owner_id = owner_id;
    this.members = members;
  }

  save() {
    // Implementation of save method
  }

  update(updates) {
    // Implementation of update method
  }

  delete() {
    // Implementation of delete method
  }
}

export const ProjectModel = mongoose.model('Project', projectSchemaMongoose); 