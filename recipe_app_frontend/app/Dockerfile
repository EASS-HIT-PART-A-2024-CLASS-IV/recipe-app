# Define the build stage
FROM node:16 as build
WORKDIR /app

# Copy package.json and other necessary files
# This might include package-lock.json or yarn.lock if you have them
COPY package.json ./

COPY vite.config.js ./
COPY .env ./

# Install dependencies
RUN npm install

# Copy your source files
COPY . .

# Build your Vite project
RUN npm run build

# Production stage using Nginx to serve the built app
FROM nginx:alpine
# Copy the built assets from the build stage to Nginx's serve directory
COPY --from=build /app/dist /usr/share/nginx/html