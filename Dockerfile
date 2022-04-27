
FROM --platform=linux/amd64 node:18-alpine  as js-base

WORKDIR /app

# BUILD IMAGE
FROM js-base as build-stage

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Build
COPY . .
# Use production conf
COPY ./src/data/config.prod.json /app/src/data/config.json
RUN npm run build

# SERVING IMAGE
FROM js-base as production

# Copy built files
COPY --from=build-stage /app/build /app/build

# Install serve
RUN npm install -g serve

# Setup a non-root user to run the app
RUN adduser -D myuser
USER myuser

# Run 
CMD serve -l $PORT -s build
