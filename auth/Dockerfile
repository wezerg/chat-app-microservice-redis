FROM node

WORKDIR /code

RUN npm install express \
&& npm install redis \
&& npm install cookie-parser \
&& npm install bcrypt

COPY ./app.mjs .

EXPOSE 3000

CMD ["node", "app.mjs"]