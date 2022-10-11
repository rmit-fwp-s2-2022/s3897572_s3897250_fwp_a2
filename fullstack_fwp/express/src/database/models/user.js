module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(32),
    },
    password_hash: {
      type: DataTypes.STRING(96),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    profile_pic: {
      type: DataTypes.STRING,
      defaultValue: "none"
    },
    email: {
      type: DataTypes.STRING,
      default: "peanutbutterjelly@gmail.com"
    },
    date_joined: {
      type: DataTypes.STRING,
      defaultValue: "none"
    },
    followers: {
      type: DataTypes.STRING,
      defaultValue: JSON.stringify([])
    },
    following: {
      type: DataTypes.STRING,
      defaultValue: JSON.stringify([])
    }

  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
