# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN yarn install --frozen-lockfile || yarn install
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN yarn install --production --frozen-lockfile || yarn install --production

EXPOSE 7983

CMD ["npx", "serve", "-s", "dist", "-l", "7983"]