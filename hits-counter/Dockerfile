FROM node

WORKDIR /code

RUN npm install express && npm install redis && npm install cors

COPY ./app.mjs .

EXPOSE 3000

CMD ["node", "app.mjs"]