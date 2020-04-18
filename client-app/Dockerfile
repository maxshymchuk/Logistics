FROM node:lts
WORKDIR /client
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
