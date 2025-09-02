'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightid: {
        type: Sequelize.INTEGER,
        allowNull: false

      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['in process', 'Booked', 'cancelled'],
        defaultValue: 'in process',
      },
      noOfSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};