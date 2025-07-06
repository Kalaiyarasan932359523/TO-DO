# 🚀 Collaborative Task Manager

A modern, full-stack task management application built with React, Express, and MongoDB. Perfect for teams and individuals looking to organize their projects efficiently.

## ✨ Features

- **🔐 User Authentication** - Secure login/register with Google OAuth support
- **📋 Task Management** - Create, edit, and organize tasks with priorities
- **👥 Team Collaboration** - Share tasks and projects with team members
- **📊 Dashboard Analytics** - Visual insights into your productivity
- **🎨 Modern UI** - Beautiful, responsive design with dark/light mode
- **📱 Mobile Responsive** - Works perfectly on all devices
- **⚡ Real-time Updates** - Instant synchronization across devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible components
- **React Query** - Server state management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication

### Deployment
- **Vercel** - Full-stack deployment platform
- **MongoDB Atlas** - Cloud database

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kalaiyarasan932359523/TO-DO.git
   cd CollaborativeTaskManager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secure_session_secret
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
CollaborativeTaskManager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and types
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Express backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   └── auth.ts            # Authentication logic
├── api/                   # Vercel serverless functions
├── shared/                # Shared types and schemas
└── vercel.json           # Vercel configuration
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Type checking
npm run check        # Run TypeScript compiler

# Database
npm run db:seed      # Seed database with sample data
```

### Code Style

- **TypeScript** - Strict type checking enabled
- **ESLint** - Code linting and formatting
- **Prettier** - Consistent code formatting

## 🌐 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Set Environment Variables**
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `SESSION_SECRET` - A secure random string
   - `GOOGLE_CLIENT_ID` - Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
   - `NODE_ENV` - Set to "production"

3. **Deploy**
   - Vercel will automatically build and deploy your app
   - Frontend served as static files
   - Backend as serverless functions

### MongoDB Atlas Setup

1. **Create a cluster**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster

2. **Configure database access**
   - Create a database user with read/write permissions
   - Add your IP address to the network access list

3. **Get connection string**
   - Copy the connection string from your cluster
   - Replace `<password>` with your database user password

## 🔐 Authentication

### Local Authentication
- Username/password registration and login
- Secure password hashing with bcrypt
- Session-based authentication

### Google OAuth
- One-click login with Google account
- Automatic user creation for new OAuth users
- Seamless integration with existing accounts

## 📊 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/auth/google` - Google OAuth

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## 📞 Support

If you have any questions or need help:
- Create an issue in this repository
- Contact the development team

---

**This project is a part of a hackathon run by [https://www.katomaran.com](https://www.katomaran.com)** 