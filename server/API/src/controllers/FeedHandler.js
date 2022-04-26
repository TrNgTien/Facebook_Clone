const Feed = require("../model/Feed");
const Comment = require("../model/Comment");
const cloudinary = require("../utils/cloudinary");
require("../utils/multer");
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
			let feedAttachments = req.file.path;
			let { description } = req.body;
			let uploadResponse = await cloudinary.uploader.upload(feedAttachments, {
				resource_type: "auto",
				folder: "Facebook Clone/Feed Attachments",
			});
			let feedAttachmentsUrl = uploadResponse.secure_url;
			let newFeed = new Feed({
				description: description,
				feedAttachments: feedAttachmentsUrl,
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
		try {
			let { id } = req.params;
			let userID = req.user.id;
			let feed = await Feed.findById({ _id: id });
			if (!feed.userReact.includes(userID)) {
				await feed.updateOne({ $push: { userReact: userID } });
				await feed.updateOne({ numberOfLike: feed.numberOfLike + 1 });
				return res.status(200).json({
					message: "likes successfully",
				});
			} else {
				await feed.updateOne({ $pull: { userReact: userID } });
				await feed.updateOne({ numberOfLike: feed.numberOfLike - 1 });
				return res.status(200).json({
					message: "dislikes successfully",
				});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json("Internal server error");
		}
	},
	commentFeed: async (req, res) => {
		try {
			let commentAttachments = req.file.path;
			let { id } = req.params;
			let { commentContent } = req.body;
			let userID = req.user.id;
			let feed = await Feed.findById({ _id: id });
			let uploadResponse = await cloudinary.uploader.upload(
				commentAttachments,
				{
					resource_type: "auto",
					folder: "Facebook Clone/Comment Attachments",
				}
			);
			let commentAttachmentsUrl = uploadResponse.secure_url;
			let comment = new Comment({
				commentContent: commentContent,
				commentAttachments: commentAttachmentsUrl,
				userID: userID,
				feedID: id,
			});
			await comment.save();
			await feed.updateOne({ numberOfComment: feed.numberOfComment + 1 });
			return res.status(200).json({
				message: "Comment successfully",
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json("Internal server error");
		}
	},
	deleteComment: async (req, res) => {
		try {
			let { commentID, feedID } = req.params;
			console.log(commentID);
			console.log(feedID);
			let userID = req.user.id;
			let comment = await Comment.findById({ _id: commentID });
			let feed = await Feed.findById({ _id: feedID });
			console.log(userID);
			console.log(comment.userID);
			console.log(feed.userID);
			if (
				comment.userID.toString() === userID ||
				feed.userID.toString() === userID
			) {
				await comment.remove();
				await Feed.updateOne(
					{ _id: comment.feedID },
					{ $inc: { numberOfComment: -1 } }
				);
				return res.status(200).json({
					message: "Delete successfully",
				});
			} else {
				return res.status(401).json({
					message: "You are not allowed to delete this comment",
				});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json("Internal server error");
		}
	},
	getCommentOfFeed: async (req, res) => {
		try {
			let { id } = req.params;
			let comment = await Comment.find({ feedID: id });
			return res.status(200).json({
				data: comment,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json("Internal server error");
		}
	},
};
