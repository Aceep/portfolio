FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
# `npm ci` and not `npm install`: the point of this image is an environment
# that matches CI, and `install` is free to resolve past the lockfile.
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
