FROM node:16
EXPOSE 3000:3000
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "run", "start"]