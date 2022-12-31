FROM node

WORKDIR /code

RUN npm install ws \
&& npm install redis

COPY ./app.mjs .

EXPOSE 3000

CMD ["node", "app.mjs"]