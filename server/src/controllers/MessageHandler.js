const Message = require('../model/Message');
const Room = require('../model/Room');

module.exports = {
    sendMessage: async (req, res) => {
        try{
            let {message, roomID} = req.body;
            let senderID = req.user.id;
            let getMembers = await Room.findOne({_id: roomID}, {members: {$in: [senderID]}});
            if (getMembers){
                let newMessage = new Message({
                    userID: senderID,
                    roomID: roomID,
                    message: message
                });
                let chat = await newMessage.save();
                return res.status(200).json({
                    userID: senderID,
                    message: message,
                    _id: chat._id,
                    time: chat.time
                });
            }
            else{
                return res.status(400).json({message: "You are not in room"});
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    },
    getChatOfRoom: async (req, res) => {
        try{
            let {roomID} = req.params;
            let userID = req.user.id;
            let getMembers = await Room.findOne({_id: roomID}, {members: {$in: [userID]}});
            let chat = [];
            if (getMembers){
                let message = await Message.find({roomID: roomID});
                let messageLength = message.length;
                for (let i = 0; i < messageLength; i++){
                    let chatData = {
                        _id: message[i]._id,
                        userID: message[i].userID,
                        roomID: message[i].roomID,
                        time: message[i].time
                    }
                    chat.push(chatData);
                }
                return res.status(200).json({chatData: chat});
            }
            else{
                return res.status(400).json({message: "You are not in room"});
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    }
}