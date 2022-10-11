module.exports = (sequelize, DataTypes) =>
  sequelize.define("reactions", {
    reactions_id: {
        type: DataTypes.BIGINT,
        primaryKey: true      
    },
    like: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dislike: {
        type: DataTypes.BOOLEAN,
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