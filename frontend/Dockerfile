# Use Node.js LTS version for development
FROM node:20-alpine
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . ./

# Expose the development server port
EXPOSE 5173

# Start the development server with file watching
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
