const {DataTypes} = require('sequelize');
const db = require('../utils/database');
// const Users = require('./users.models');

const Conversations = db.define('conversations', {

  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // createdBy: {
  //   type: DataTypes.UUID,
  //   allowNull: false,
  //   references: {
  //     model: Users,
  //     key: 'id'
  //   }
  // },
  isGroup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

});

module.exports = Conversations;