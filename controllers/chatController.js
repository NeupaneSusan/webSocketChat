const chatModel = require('../model/chatModel');

const chatSaveController = async (req, res) => {
    try {
        const { sender_id, receiver_id, message } = req.body;
        const chatData = new chatModel({
            sender_id: sender_id,
            receiver_id: receiver_id,
            message: message

        });
        await chatData.save();
        return res.status(200).send({ success: true })
    } catch (error) {
        return res.status(400).send({ success: false, msg: 'ERROR' })
    }
}

module.exports = {
    chatSaveController
}