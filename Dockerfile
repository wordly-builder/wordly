FROM node:20-alpine AS build

WORKDIR /app
COPY . .
RUN rm -rf node_modules
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM node:20-alpine AS deploy-node

WORKDIR /app

EXPOSE 5173

RUN rm -rf ./*

COPY --from=build /app/package.json .
COPY --from=build /app/build .
COPY --from=build /app/.drizzle ./.drizzle

RUN npm install -g pnpm
RUN pnpm install --prod

CMD ["node", "index.js"]