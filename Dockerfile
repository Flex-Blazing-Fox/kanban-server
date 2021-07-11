FROM node:14

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

CMD ["chmod", "a+x", "deployment-task.sh"]