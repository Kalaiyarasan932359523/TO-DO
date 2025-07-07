# Use official Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the backend
RUN npm run build

# Expose the port Cloud Run will use
ENV PORT 8080

# Start the server
CMD ["npm", "run", "start:api-only"] 