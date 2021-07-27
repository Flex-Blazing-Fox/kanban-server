"use strict";
const fs = require("fs");

let data = JSON.parse(
  fs.readFileSync("./database/task.json", { encoding: "utf-8" })
);

data = data.map((dataPoint) => {
  return {
    ...dataPoint,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tasks", data, {});
    await queryInterface.sequelize.query(
      `SELECT SETVAL('"Tasks_id_seq"', (SELECT MAX(id) FROM "Tasks"))`
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tasks", null, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Tasks_id_seq" RESTART`
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
