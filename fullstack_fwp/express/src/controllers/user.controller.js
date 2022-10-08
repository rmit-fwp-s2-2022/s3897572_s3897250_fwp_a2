const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id, {
      include: {
          all: true,
          nested: true
      }
    }
  );

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findOne({where:{username:req.query.username}});

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    username: req.body.username,
    password_hash: hash,
    user_id: req.body.user_id,
    first_name: req.body.firstname,
    last_name: req.body.lastname,
  });

  res.json(user);
};

// Updates user from the database
exports.update = async (req, res) => {

  const to_be_updated = await db.user.update({username: req.body.username, first_name: req.body.first_name, last_name: req.body.last_name}, 
    { where: { username: req.body.username}
    });

  
  res.json(to_be_updated);
};

// Deletes user from the database
exports.delete = async (req, res) => {

  console.log(req.params.id, "damnn id")

  const to_be_deleted = await db.user.destroy({where: {user_id:req.params.id} 
  
  });

  res.json(to_be_deleted);
};
