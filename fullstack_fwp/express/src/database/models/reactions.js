module.exports = (sequelize, DataTypes) =>
  sequelize.define("reactions", {
    reactions_id: {
        type: DataTypes.BIGINT,
        primaryKey: true      
    },
    liked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    disliked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    likeCount: {              
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    peopleWhoHaveLiked: {
      type: DataTypes.STRING,
      defaultValue: JSON.stringify([])
    },
    peopleWhoHaveDisliked: {
      type: DataTypes.STRING,
      defaultValue: JSON.stringify([])
    }
  
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });