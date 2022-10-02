module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING(32),
      primaryKey: true
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
      default: "none"
    }

  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
