FROM node:20.18.0-alpine3.19 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production && npm cache clean --force


COPY prisma ./prisma/
COPY tsconfig*.json ./
COPY doc ./doc/
COPY . .

RUN npm run build


FROM node:20.18.0-alpine3.19 AS production

WORKDIR /app

COPY package*.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/doc ./doc/

ENTRYPOINT ["sh", "-c", "npm run prisma:start && npm run start"]
