# Stage 1: Build the application
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built app with a lightweight server
FROM node:18-slim

# Install serve to serve static files
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist /app/dist

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "3000"]