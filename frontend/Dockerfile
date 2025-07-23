# Use Node.js LTS version for building
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./
RUN npm ci

# Copy source code and build the application
COPY . ./
RUN npm run build

# Use nginx to serve the built application
FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built application from build stage
COPY --from=build /app/dist .

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
