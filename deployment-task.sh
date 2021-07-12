npm install --only=prod
echo $DATABASE_URL
npx sequelize db:migrate:undo:all --env production
npx sequelize db:migrate:all --env production
npx sequelize db:seed:undo:all --env production
npx sequelize db:seed:all --env production