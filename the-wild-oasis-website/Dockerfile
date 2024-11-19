From node:20-alpine

WORKDIR /dist

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]