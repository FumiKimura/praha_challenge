FROM node:latest
WORKDIR /app
COPY app .
RUN npm install
RUN npm run build
EXPOSE 3030
CMD ["npm", "start"]