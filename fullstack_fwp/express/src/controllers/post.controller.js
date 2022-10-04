const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.post.findAll();    // Need to add include/nested fields set

  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {

  const post = await db.post.create({
    title: req.body.title,
    username: req.body.username,
    body: req.body.body,
    id: req.body.id,
    image: req.body.image
  });

  res.json(post);
};