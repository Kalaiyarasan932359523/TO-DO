import mongoose, { Document, Model } from "mongoose";

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
  find(conditions?: any): Promise<IFeedback[]>;
  findById(id: any): Promise<IFeedback | null>;
  findByIdAndUpdate(id: any, update: any, options?: any): Promise<IFeedback | null>;
  findByIdAndDelete(id: any): Promise<IFeedback | null>;
  create(feedback: any): Promise<IFeedback>;
  countDocuments(conditions?: any): Promise<number>;
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