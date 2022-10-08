const db = require("../database");

// Select all replies of a post.
exports.allReplies = async (req, res) => {
  const replies = await db.reply.findAll({
    where: {
        id: req.body.id
    },
    include: {
      all: true,
      nested: true
    }
  });

  res.json(replies);
};


// Create a reply from a post.
exports.createReply = async (req, res) => {
    const replyobj = await db.reply.create({
        id: req.body.id, 
        reply_id: req.body.reply_id,
        reply_body: req.body.reply,
        user: req.body.user,
        date: req.body.date
    });
  
    res.json(replyobj);
};