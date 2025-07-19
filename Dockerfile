# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production --frozen-lockfile

EXPOSE 7983

CMD ["npx", "serve", "-s", "dist", "-l", "7983"]