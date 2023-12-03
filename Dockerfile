# Use the official Node.js image as a base image with Node.js 18.16.0
FROM node:18.16.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Express.js app will run on (set to 2023 as per your environment variable)
EXPOSE 2023

CMD [ "node", "src/index.js" ]