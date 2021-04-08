FROM node:alpine
RUN apk update npm && apk add ca-certificates && update-ca-certificates
RUN mkdir -p /app/src
WORKDIR /app/src
COPY ./package*.json ./
RUN npm update
COPY . .
EXPOSE 4000
CMD node index 