FROM node:lts
WORKDIR /server
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
RUN npm run compile 
CMD ["npm", "start"]