import mongoose, { Document, Model, Query } from "mongoose";
import { UserRole } from '../../shared/schema';

// Interface for User document
export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for User model with static methods
export interface IUserModel extends Model<IUser> {
  findOne(conditions: any): Query<IUser | null, IUser>;
  create(user: any): Promise<IUser>;
  findById(id: any): Query<IUser | null, IUser>;
  findByIdAndUpdate(id: any, update: any, options?: any): Query<IUser | null, IUser>;
  find(conditions?: any): Query<IUser[], IUser>;
  countDocuments(conditions?: any): Query<number, IUser>;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.TEAM_MEMBER
  },
  avatar: {
    type: String,
    default: null
  },
  googleId: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Add any methods or statics here if needed
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = mongoose.model<IUser, IUserModel>("User", userSchema); 