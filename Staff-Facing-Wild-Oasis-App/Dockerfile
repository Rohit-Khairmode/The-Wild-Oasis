# Use the official Node.js 20 image based on Alpine Linux
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json first for better caching
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that your app will run on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]