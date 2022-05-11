FROM node:12

# Create app directory
WORKDIR /client

# Install app dependencies
COPY package.json /client
COPY package-lock.json /client
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start"]
