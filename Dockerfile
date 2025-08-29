# ===== build =====
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

ARG BASENAME=/admin
RUN npx react-router build --basename ${BASENAME}

# ===== runtime =====
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/build ./build

EXPOSE 8080
CMD ["npm", "run", "start"]
