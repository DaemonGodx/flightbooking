'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking.init({
    flightid: {type:DataTypes.INTEGER,
      allowNull:false

    },
    userid: {
      type:DataTypes.INTEGER,
      allowNull:false

    },
    status: {type: DataTypes.ENUM,
      allowNull:false,
      values: ['in process', 'Booked', 'cancelled'],
      defaultValue:'in process'
    },
    noOfSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};