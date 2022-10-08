module.exports = (express, app) => {
  const controller = require("../controllers/reply.controller.js");
  const router = express.Router();

  // Select all replies.
  router.get("/", controller.allReplies);

  // Create a reply.
  router.get("/createReply", controller.createReply);

  // Add routes to server.
  app.use("/api/reply", router);
};
