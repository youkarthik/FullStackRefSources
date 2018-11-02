# Base image
FROM stefanscherer/node-windows

#Working directory
WORKDIR /app

#Copying package.json
COPY package.json /app

#install dependencies
RUN npm install

#copy application code
COPY . /app

CMD npm start