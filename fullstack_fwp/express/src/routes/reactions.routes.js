module.exports = (express, app) => {
    const controller = require("../controllers/reactions.controller.js");
    const router = express.Router();

    // Gets reactions object for post
    router.post("/getReactions/:id", controller.getReactions);

    // Creates reactions for a post
    router.post("/create", controller.createReactions);

    // Updates reactions for a post
    router.post("/update", controller.updateReactions);

  

    app.use("/api/reactions", router);
  };
  