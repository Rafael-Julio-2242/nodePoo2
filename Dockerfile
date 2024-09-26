# Stage 1: Build
FROM node:22 AS build
WORKDIR /app
COPY package.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:22
WORKDIR /app
COPY --from=build /app ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start"]