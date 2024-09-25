
# Stage 1: Build Stage
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies with a longer timeout and prefer offline cache
RUN npm config set fetch-timeout 600000
RUN npm install --no-audit --prefer-offline

# Copy the rest of the application source code to the container
COPY . .

# Copy the .env file to the container
COPY .env .env

# Build the Next.js app
RUN npm run build

# Stage 2: Production Stage
FROM node:20-alpine AS runner

# Set NODE_ENV to production
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production --no-audit --prefer-offline

# Copy the build output and .env file from the build stage
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/next.config.mjs /app/next.config.mjs
COPY --from=builder /app/.env .env  # Copy .env to production stage

# Expose the Next.js default port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
