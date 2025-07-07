import mongoose, { Document, Model, Query } from "mongoose";

// Interface for Feedback document
export interface IFeedback extends Document {
  category: 'bug' | 'feature' | 'improvement' | 'other';
  type: 'positive' | 'negative' | 'neutral';
  rating: number;
  message: string;
  anonymous: boolean;
  user_id?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Feedback model with static methods
export interface IFeedbackModel extends Model<IFeedback> {
  find(conditions?: any): Query<IFeedback[], IFeedback>;
  findById(id: any): Query<IFeedback | null, IFeedback>;
  findByIdAndUpdate(id: any, update: any, options?: any): Query<IFeedback | null, IFeedback>;
  findByIdAndDelete(id: any): Query<IFeedback | null, IFeedback>;
  create(feedback: any): Promise<IFeedback>;
  countDocuments(conditions?: any): Query<number, IFeedback>;
}

const feedbackSchema = new mongoose.Schema<IFeedback>({
  category: {
    type: String,
    required: true,
    enum: ['bug', 'feature', 'improvement', 'other']
  },
  type: {
    type: String,
    required: true,
    enum: ['positive', 'negative', 'neutral']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Add any methods or statics here if needed
feedbackSchema.methods.toJSON = function() {
  const feedback = this.toObject();
  if (feedback.anonymous) {
    delete feedback.user_id;
  }
  return feedback;
};

export const Feedback = mongoose.model<IFeedback, IFeedbackModel>("Feedback", feedbackSchema); 