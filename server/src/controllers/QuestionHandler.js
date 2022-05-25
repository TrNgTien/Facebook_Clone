const Question = require('../model/Question');


module.exports = {
    addQuestion: async (req, res) => {
        try{
            let {questionContent} = req.body;
            let question = new Question({
                questionContent: questionContent,
            });
            await question.save();
            return res.status(200).json({
                message: "Add successfully!",
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    },
    getAllQuestion: async (req, res) => {
        try{
            let questions = await Question.find();
            return res.status(200).json({
                questions: questions
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    },
    getAQuestion: async (req, res) => {
        try{
            let {questionID} = req.params;
            let question = await Question.findOne({_id: questionID});
            return res.status(200).json({
                question: question
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    }
}