const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.post.findAll();    // Need to add include/nested fields set

  res.json(posts);
};

// Gets single post from database from its own post id
exports.postFromUser = async (req, res) => {

  const UserPost = await db.post.findByPk(req.params.id, {
    include: {
        all: true,
        nested: true
    }
  }
);


  res.json(UserPost);
};


exports.postsFromUser = async (req, res) => {
  const UserPosts = await db.post.findAll({
    where: {
      user_id: req.params.id
    }
  });

  res.json(UserPosts);
};


// Create a post in the database.
exports.create = async (req, res) => {

  const post = await db.post.create({
    title: req.body.title,
    username: req.body.username,
    body: req.body.body,
    id: req.body.id,
    image: req.body.image,
    user_id: req.body.user_id
  });

  res.json(post);
};

exports.deletePost = async (req, res) => {
  const deletePost = await db.post.destroy({
    where: {
      id: req.params.id
    }
  });

  res.json(deletePost);
};

exports.updatePost = async (req, res) => {
  const updatePost = await db.post.update({body: req.body.body}, {
    where: {
      id: req.body.id
    }
  });

  res.json(updatePost);
};
