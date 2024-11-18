
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install && npm cache clean --force && apk add --no-cache bash
COPY . .
ENTRYPOINT ["sh", "-c", "npm run prisma:start && npm run start"]
