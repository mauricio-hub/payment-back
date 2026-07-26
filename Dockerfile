FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache openssl

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
