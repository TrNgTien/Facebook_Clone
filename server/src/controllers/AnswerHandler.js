const Answer = require('../model/Answer');

module.exports = {
    addAnswer: (req, res) => {
        try{
            let {answerContent} = req.body;
            let answer = new Answer({
                answerContent: answerContent,
            });
            answer.save();
            return res.status(200).json({
                message: "Add successfully!",
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    },
    getAnswerOfQuestion: (req, res) => {
        try{
            let {questionID} = req.params;
            let answers = Answer.find({questionID: questionID});
            return res.status(200).json({
                data: answers
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    }
}