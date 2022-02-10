const db = require("../database/FirebaseConnection.js");
module.exports = {
  addNewsFeed: async (req, res) => {
    try {
      const { id, title } = req.body;
      const newsFeed = {
        id: id,
        title: title,
      };
      const dbConnection = await db.collection("newsFeed");
      dbConnection.add(newsFeed);
      res.status(200).json("Add successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  getFeed: async (req, res) => {
    try {
      const dbConnection = await db.collection("newsFeed");
      const newsFeed = await dbConnection.get();
      const dataFeed = newsFeed.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
        };
      });
      res.status(200).json(dataFeed);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
};
