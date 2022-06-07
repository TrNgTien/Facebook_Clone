const { trusted } = require('mongoose');
const Room = require('../model/Room');

module.exports = {
    createRoom: async (req, res) => {
        try{
            const {senderID, receiverID} = req.body;
            let members = [senderID, receiverID];
            let getMembers = await Room.findOne({members: {$all: members}});
            if (getMembers){
                return res.status(400).json({message: "Room already exist"});
            }
            else {
                let newRoom = new Room({
                    members: members
                });
                let room = await newRoom.save();
                return res.status(200).json({
                    message: "Room created successfully",
                    room: room
                })
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    },
    getRoomOfUser: async (req, res) => {
        try{
            let {userID} = req.params;
            let room = await Room.find({members: {$in: [userID]}});
            return res.status(200).json({room});
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    }
}