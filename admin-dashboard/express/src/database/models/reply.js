module.exports = (sequelize, DataTypes) =>
  sequelize.define("reply", {
    reply_id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    reply_body: {
        type: DataTypes.STRING
    },
    user: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.STRING
    }

  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });

