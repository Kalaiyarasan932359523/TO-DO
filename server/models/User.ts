import mongoose from 'mongoose';
import { userSchema, UserRole } from '../../shared/schema.js';

const userSchemaMongoose = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.TEAM_MEMBER },
  avatar: { type: String },
  googleId: { type: String },
}, {
  timestamps: true
});

export class User {
  constructor(username, password, name, email, role, avatar, googleId) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    this.role = role;
    this.avatar = avatar;
    this.googleId = googleId;
  }
}

export const UserModel = mongoose.model('User', userSchemaMongoose); 