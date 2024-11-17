
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install && npm cache clean --force
RUN npx prisma generate
RUN apk add --no-cache bash
COPY . .
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD ["/wait-for-it.sh", "db:5432", "--", "npm", "start"]
