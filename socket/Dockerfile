ARG NODE_VERSION=14.17.6 
FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine  

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

ENV SOCKET_PORT=4001

CMD ["npm", "start" ]
