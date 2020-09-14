# Use the official image as a parent image.
FROM node:12.18.3-alpine

# Set the working directory.
WORKDIR /usr/src/app

COPY . .

# build client
RUN cd client && npm install && npm run build
# move built client files to /temp/client
RUN mkdir temp && cd temp && mkdir client
RUN mv ./client/build/* ./temp/client/

# build server
RUN cd server && npm install && npm run build
# move built server files to root
RUN mv ./server/* ./

# remove /client and /server (source files)
RUN rm -rf ./client
RUN rm -rf ./server

# move built client files to /client
RUN mkdir client
RUN mv ./temp/client/* ./client
RUN rm -rf ./temp

EXPOSE 5000

CMD [ "npm", "run", "start:prod" ]

