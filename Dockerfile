FROM --platform=linux/amd64 node:19-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 1423
CMD ["node", "index.js"]