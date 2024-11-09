FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
