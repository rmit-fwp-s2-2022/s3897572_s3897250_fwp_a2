const db = require("../database");


// Creates a comment from a post.
exports.createComment = async (req, res) => {
    const commentobj = await db.comment.create({
        reply_id: req.body.reply_id,
        comment_id: req.body.comment_id,
        comment_body: req.body.comment_body,
        user: req.body.user,
    });
  
    res.json(commentobj);
};


// Gets comments from a reply.
exports.getComments = async (req, res) => {
    const commentobjs = await db.comment.findAll({
        where: {
            reply_id: req.body.reply_id
        }
    });
  
    res.json(commentobjs);
};