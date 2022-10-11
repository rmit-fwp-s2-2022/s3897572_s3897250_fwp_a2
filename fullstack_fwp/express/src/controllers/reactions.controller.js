const db = require("../database");


// Creates reaction
exports.createReactions = async (req, res) => {
    const reactionsObj = await db.reactions.create({
        id: req.body.id,
        reactions_id: req.body.reactions_id,
    });
  
    res.json(reactionsObj);
};


  // Update reactions
  exports.updateReactions = async (req, res) => {
      const updatedReactionsObj = await db.reactions.update({
          liked: req.body.liked,
          disliked: req.body.disliked,
          peopleWhoHaveLiked: req.body.peopleWhoHaveLiked,
          peopleWhoHaveDisliked: req.body.peopleWhoHaveDisliked
      },
      {
        where: {
            id: req.body.id     // Search based on id of post
        }
      });
    
      res.json(updatedReactionsObj);
  };


    // Gets reactions
exports.getReactions = async (req, res) => {
    const reactionsObj = await db.reactions.findOne({
        where: 
        {id: req.params.id}
    });
  
    res.json(reactionsObj);
};