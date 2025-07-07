import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
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

export const Feedback = mongoose.model("Feedback", feedbackSchema); 