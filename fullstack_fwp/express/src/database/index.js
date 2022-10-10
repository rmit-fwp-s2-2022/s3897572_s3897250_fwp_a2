const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const user = require("./models/user.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  dialectOptions: {
    supportBigNumbers: true
  }
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.reply = require("./models/reply.js")(db.sequelize, DataTypes);
db.comment = require("./models/comment.js")(db.sequelize, DataTypes);



// Relate post and user.

db.post.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
    allowNull: false
  },
  onDelete: "CASCADE"
})

db.user.hasMany(db.post)



// Relate post and reply

db.reply.belongsTo(db.post, {
  foreignKey: {
    name: "id",
    allowNull: false
  },
  onDelete: "CASCADE"
})

db.post.hasMany(db.reply)



// Relate reply and comment

db.comment.belongsTo(db.reply, {
  foreignKey: {
    name: "reply_id",
    allowNull: false
  },
  onDelete: "CASCADE"
})

db.reply.hasMany(db.comment)



// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync({force: true});

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  const argon2 = require("argon2");

  const testing_id = parseInt(Date.now())

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ username: "testingrecord", user_id: testing_id, password_hash: hash, first_name: "testingrecord", last_name : "testingrecord", profile_pic: "testingrecord" , email: "testingrecord@gmail.com"});


  await db.post.create({
    title: 'req.body.title',
    username: 'seq.body.username',
    body: 'req.body.body',
    id: 1,
    image: 'req.body.image',
    user_id: testing_id
  });


  await db.reply.create({id: 1, reply: 'reply', user: 'testingrecord', reply_id: parseInt(Date.now()), date: new Date().toLocaleDateString()});
  // console.log(replyObj)

}

module.exports = db;
