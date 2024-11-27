FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules && npm ci

COPY . .

RUN npx prisma generate

COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

EXPOSE 8080

CMD ["sh", "-c", "./wait-for-it.sh shopper-move-pg:5432 -- npx prisma migrate dev && npm run prisma:seed && npm run dev"]

