# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18 as build-stage
ENV NODE_ENV=production
ENV NODE_OPTIONS='--openssl-legacy-provider'
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY ./ /app/
#RUN CI=true npm test
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.19.0
COPY --from=build-stage /app/build/ /usr/share/nginx/html
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
LABEL name="nginx-frontend"
LABEL version="v1.0"