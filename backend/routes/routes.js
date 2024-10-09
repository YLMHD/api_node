const express = require('express'); // Import express
const {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,    
} = require("../controllers/postController");
const router = express.Router();



// Define the route for the root URL of the site

// get request
router.get("/", getPosts);

// post request
router.post("/", addPost);

// put request
router.put("/:id", updatePost);

// delete request
router.delete("/:id", deletePost);

// patch request to like a post
router.patch("/like-post/:id", likePost);
// patch request to dislike a post

router.patch("/dislike-post/:id", dislikePost);

module.exports = router;