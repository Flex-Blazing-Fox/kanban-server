#!/bin/bash

npm install
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev