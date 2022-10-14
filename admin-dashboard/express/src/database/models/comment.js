module.exports = (sequelize, DataTypes) =>
  sequelize.define("comment", {
    comment_id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    comment_body: {
        type: DataTypes.STRING
    },
    user: {
        type: DataTypes.STRING,
    }

  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });

