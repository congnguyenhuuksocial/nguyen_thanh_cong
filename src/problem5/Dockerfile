FROM node:16.13.1 as build

ARG NPM_CONFIG
ARG ENABLE_UNIT_TEST=1
ENV NODE_OPTIONS=--max_old_space_size=8192

WORKDIR /build

RUN echo "$NPM_CONFIG" > .npmrc

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Only install production required packages
RUN rm -rf node_modules && npm install
RUN rm .npmrc

### Package stage

FROM node:16.13.1-alpine3.14
WORKDIR /usr/src/app

# Only copy production required files
COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package.json .

EXPOSE 8080
CMD [ "npm", "run", "start" ]
