const postModel = require('../models/postModel'); 

/*
* GET this module is used to get all the posts
 */
module.exports.getPosts = async (req, res) => {
    try {
        const posts = await postModel.find();
        res.json(posts);
        //res.json({ message: "Post show" });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}

/*
* POST this module is used to add a new post
 */
module.exports.addPost = async (req, res) => {
  if (!req.body.message && !req.body.author) {
    return res.status(400).json({ error: "Message is required" });
  }
  try {
    const post = new postModel({
      message: req.body.message,
      author: req.body.author,
    });
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

/*
* Update this module is used to update a post
 */
module.exports.updatePost = async (req, res) => {
    if (!req.body.message && !req.params.id) {
        return res.status(400).json({ error: "Message is required" });
    }
    const post = await postModel.findById(req.params.id);
    if (!post) {
        return res.status(400).json({ error: "Post not found" });
    }
    try {
        const updatedPost = await postModel.findByIdAndUpdate(post, req.body, { new: true });
        // post.message = req.body.message;
        // await post.save();
        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}

/*
* DELETE this module is used to delete a post
 */
module.exports.deletePost = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Id is required" });
    }

    const post = await postModel.findById(req.params.id);

    if (!post) {
        return res.status(400).json({ error: "Post not found" });
    }

    try {
        await postModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted", post });        
    }
    catch (err) {
        res.status(400).json({ error: "Post can't deleted" });
    }
}

/**
 * PATCH this module is used to like a post
 */
module.exports.likePost = async (req, res) => {
    if (!req.params.id && !req.body.userId) {
        return res.status(400).json({ error: "Id is required" });
    }

    try {
        const post = await postModel.findById(req.params.id);
        if (post.likers.includes(req.body.userId)) {
          return res.status(400).json({ error: "Post already liked" });
        }
        const updatedPost = await postModel.findByIdAndUpdate(
          req.params.id,
          { $push: { likers: req.body.userId } },
          { new: true }
        );
        res.status(200).json({ message: "Post liked", updatedPost });
    }
    catch (err) {
        res.status(400).json({ error: "Post can't liked" });
    }
}

/**
 * PATCH this module is used to dislike a post
 */
module.exports.dislikePost = async (req, res) => {
    if (!req.params.id && !req.body.userId) {
        return res.status(400).json({ error: "Id is required" });
    }

    try {
        const post = await postModel.findById(req.params.id);
        if (!post.likers.includes(req.body.userId)) {
          return res.status(400).json({ error: "Post already disliked" });
        }else{
            const updatedPost = await postModel.findByIdAndUpdate(
                req.params.id,
                { $pull: { likers: req.body.userId } },
                { new: true }
            );
            res.status(200).json({ message: "Post disliked", updatedPost });
        }   
    }
    catch (err) {
        res.status(400).json({ error: "Post can't disliked" });
    }
}