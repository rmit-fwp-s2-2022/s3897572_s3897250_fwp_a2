module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    title: {
      type: DataTypes.STRING(144),
    },
    body: {
        type: DataTypes.STRING(144),
    },
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING(144),
    },
    

  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });