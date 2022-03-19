const Feed = require("../model/Feed");

module.exports = {
  getFeed: async (req, res) => {
    try {
      let allFeed = await Feed.find();
      return res.status(200).json({
        data: allFeed,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },

  addFeed: async (req, res) => {
    try {
      let { description, feedAttachments } = req.body;
      let newFeed = new Feed({
        description: description,
        feedAttachments: feedAttachments,
        userID: req.user.id,
      });
      await newFeed.save();
      return res.status(200).json({
        message: "Post Successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  reactFeed: async (req, res) => {
    try{
      let {id} = req.params;
      let userID = req.user.id;
      let feed = await Feed.findById({_id: id})
      if (!feed.userReact.includes(userID)){
        await feed.updateOne({$push: {userReact: userID}});
        await feed.updateOne({numberOfLike: feed.numberOfLike + 1});
        return res.status(200).json({
          message: "likes successfully"
        })
      }
      else{
        await feed.updateOne({$pull: {userReact: userID}});
        await feed.updateOne({numberOfLike: feed.numberOfLike - 1});
        return res.status(200).json({
          message: "dislikes successfully"
        })
      }
    }
    catch(error){
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
};
