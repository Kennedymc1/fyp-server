ARG NODE_VERSION=14.17.6 
FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine  

WORKDIR /app

COPY package.json ./
COPY .npmrc ./


RUN npm install

COPY . ./

# WARNING
# this is just to get a test version out as soon as possible for the landing page
#GET RID OF THESE ENVIRONMENT VARIABLES BEFORE FULL LAUNCH
ENV MONGODB_URI=
ENV ACCESS_TOKEN_SECRET=secret
ENV REFRESH_TOKEN_SECRET=secret
ENV BASE_PORT=4000



CMD ["npm", "start" ]