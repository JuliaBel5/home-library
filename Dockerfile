
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install && npm cache clean --force
RUN apk add --no-cache bash
COPY . .
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
ENTRYPOINT ["/wait-for-it.sh", "postgres:5432", "--","sh", "-c", "npm run prisma:start && npm run start"]
