module.exports = (express, app) => {
    const controller = require("../controllers/reactions.controller.js");
    const router = express.Router();
  

    app.use("/api/reactions", router);
  };
  