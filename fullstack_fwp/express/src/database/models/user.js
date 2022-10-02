module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    user_email: { // Will contain an email..
      type: DataTypes.STRING(56),
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },

    password_hash: {
      type: DataTypes.STRING(96),
      allowNull: false
    },


  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
