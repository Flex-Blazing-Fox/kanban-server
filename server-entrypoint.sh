#!/bin/bash

npm install
npx sequelize db:migrate:undo:all
npx sequelize db:migrate
npx sequelize db:seed:undo:all
npx sequelize db:seed:all
node index.js