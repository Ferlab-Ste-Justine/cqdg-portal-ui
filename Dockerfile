FROM node:18.20.4 as build-stage

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install --ignore-scripts
RUN npm rebuild node-sass

COPY ./ /app/

RUN npm run theme
RUN npm run build

FROM nginx:1.24

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY static.conf /etc/nginx/conf.d/default.conf

# Copy the entrypoint script into the image
COPY entrypoint.sh /entrypoint.sh

# Make the script executable
RUN chmod +x /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]