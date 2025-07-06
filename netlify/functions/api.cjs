const { builder } = require('@netlify/functions');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.DATABASE_URL;
    
    if (!mongoURI) {
      throw new Error('MongoDB connection string not found in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'user', 'manager'], default: 'user' },
  avatar: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in_progress', 'completed', 'cancelled'], default: 'pending' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  due_date: { type: Date },
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shared_with: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [{ type: String }],
  attachments: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

// Project Schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['active', 'completed', 'on_hold', 'cancelled'], default: 'active' },
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

// Setup Passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        username: profile.emails[0].value,
        email: profile.emails[0].value,
        name: profile.displayName,
        password: 'google-auth' // Placeholder password for Google users
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

// Authentication middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

// Role check middleware
function hasRole(roles) {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    next();
  };
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Auth routes
app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/api/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect("/login");
    }

    const user = req.user;
    req.session.userId = user._id.toString();
    
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.redirect("/login");
      }
      res.redirect("/");
    });
  } catch (err) {
    console.error("Google callback error:", err);
    res.redirect("/login");
  }
});

// Auth check endpoint
app.get("/api/user", async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  res.json(user);
});

// Tasks routes
app.get("/api/tasks", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'created_at';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const query = {
      $or: [
        { creator_id: userId },
        { assignee_id: userId },
        { shared_with: userId }
      ]
    };

    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .populate('creator_id', 'name username')
      .populate('assignee_id', 'name username')
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      tasks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.post("/api/tasks", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const taskData = {
      ...req.body,
      creator_id: userId,
      created_at: new Date(),
      updated_at: new Date()
    };

    const task = await Task.create(taskData);
    const populatedTask = await Task.findById(task._id)
      .populate('creator_id', 'name username')
      .populate('assignee_id', 'name username');

    res.status(201).json(populatedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: "Error creating task" });
  }
});

app.get("/api/tasks/:id", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const task = await Task.findOne({
      _id: req.params.id,
      $or: [
        { creator_id: userId },
        { assignee_id: userId },
        { shared_with: userId }
      ]
    }).populate('creator_id', 'name username')
      .populate('assignee_id', 'name username');

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: "Error fetching task" });
  }
});

app.put("/api/tasks/:id", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        $or: [
          { creator_id: userId },
          { assignee_id: userId }
        ]
      },
      {
        ...req.body,
        updated_at: new Date()
      },
      { new: true }
    ).populate('creator_id', 'name username')
      .populate('assignee_id', 'name username');

    if (!task) {
      return res.status(404).json({ message: "Task not found or access denied" });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: "Error updating task" });
  }
});

app.delete("/api/tasks/:id", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      creator_id: userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found or access denied" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

// Projects routes
app.get("/api/projects", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const projects = await Project.find({
      $or: [
        { creator_id: userId },
        { members: userId }
      ]
    }).populate('creator_id', 'name username')
      .populate('members', 'name username');

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: "Error fetching projects" });
  }
});

app.post("/api/projects", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const projectData = {
      ...req.body,
      creator_id: userId,
      created_at: new Date(),
      updated_at: new Date()
    };

    const project = await Project.create(projectData);
    const populatedProject = await Project.findById(project._id)
      .populate('creator_id', 'name username')
      .populate('members', 'name username');

    res.status(201).json(populatedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: "Error creating project" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

exports.handler = builder(app); 