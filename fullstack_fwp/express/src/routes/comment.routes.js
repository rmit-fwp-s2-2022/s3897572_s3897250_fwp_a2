module.exports = (express, app) => {
    const controller = require("../controllers/comment.controller.js");
    const router = express.Router();
  
    // Select all comments.
    router.post("/getComments", controller.getComments);
  
    // Create a comment.
    router.post("/createComment", controller.createComment);
  
    // Add routes to server.
    app.use("/api/comment", router);
  };
  