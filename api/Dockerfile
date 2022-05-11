FROM node:12

# Create app directory
WORKDIR /api

# Install app dependencies
COPY package.json /api
COPY package-lock.json /api
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "npm", "run", "dev"]
