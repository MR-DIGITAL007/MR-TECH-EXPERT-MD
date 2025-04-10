FROM node:lts-buster

# Install tools
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm install -g pm2 && \
  rm -rf /var/lib/apt/lists/*

# Clone your custom repo
RUN git clone https://github.com/MR-DIGITAL007/MR-TECH-EXPERT-MD /app

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install --legacy-peer-deps

# Copy source files (optional if everything is already in the repo)
COPY . .

# Port (optional for Heroku but fine to include)
EXPOSE 5000

# Start with PM2 runtime
CMD ["pm2-runtime", "index.js"]
