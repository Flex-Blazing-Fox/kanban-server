npm install sequelize sequelize-cli
npx sequelize db:migrate --env production
npx sequelize db:seed:undo:all --env production
npx sequelize db:seed:all --env production