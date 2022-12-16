FROM node as vuebuild
WORKDIR /code
COPY ./chat-app-frontend ./
RUN npm install && npm run build

FROM node
WORKDIR /code
RUN npm install -g http-server
COPY --from=vuebuild ./code/dist ./
EXPOSE 3000
CMD ["http-server", "./", "-p 3000"]