"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tasks",
      [
        {
          title: "First Task",
          description: "This is the first task.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Second Task",
          description: "This is the second task.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Third Task",
          description: "This is the third task.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
