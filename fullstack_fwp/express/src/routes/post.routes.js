module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Select a post from specific user.
  router.get("/:id", controller.postFromUser);

  // Select all posts from specific user.
  router.get("/:id", controller.postsFromUser);

  // Create a new post.
  router.post("/", controller.create);

  // Deletes a given post
  router.post("/delete", controller.deletePost)

  // Updates a given post
  router.post("/update", controller.updatePost)


  // Add routes to server.
  app.use("/api/posts", router);
};
