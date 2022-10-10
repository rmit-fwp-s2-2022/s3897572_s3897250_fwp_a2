module.exports = (express, app) => {
  const controller = require("../controllers/reply.controller.js");
  const router = express.Router();

  // Select all replies.
  router.post("/all", controller.allReplies);

  // Create a reply.
  router.post("/createReply", controller.createReply);

  // Add routes to server.
  app.use("/api/reply", router);
};
