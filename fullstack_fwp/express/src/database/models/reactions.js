module.exports = (sequelize, DataTypes) =>
  sequelize.define("reactions", {
    like: {
      type: DataTypes.BOOlEAN,
      defaultValue: false
    },
    dislike: {
        type: DataTypes.BOOlEAN,
        defaultValue: false
    },
    likeCount: {              
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });