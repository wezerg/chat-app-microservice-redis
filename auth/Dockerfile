FROM node

WORKDIR /code

RUN npm install express && npm install redis

COPY ./app.mjs .

EXPOSE 3000

CMD ["node", "app.mjs"]