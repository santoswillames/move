FROM node:18 AS build

# Define build arguments for environment variables
ARG VITE_GOOGLE_API_KEY
ARG VITE_API_URL

# Set environment variables during the build process
ENV VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
