module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    title: {
      type: DataTypes.STRING(144),
      primaryKey: true
    },
    body: {
        type: DataTypes.STRING(144),
        primaryKey: true
    },
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING(144),
        primaryKey: true
    },

  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });