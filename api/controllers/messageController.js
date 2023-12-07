
const Message = require("../models/Message");
const User = require('../models/User')

module.exports.getMessages = async (req, res, next) => {
  try {
    let { from, to, message } = req.body;
    from = await User.findOne({username: from})
    to = await User.findOne({username: to})
    const messages = await Message.find({
        $or: [
          { sender: from._id, users: to._id },
          { sender: to._id, users: from._id },
        ],
      }).populate('sender')
    if(messages.length===0){
        return res.json([])
    }
    const projectedMessages = messages.map((msg) => {
        t= msg.sender.email === from.email
      return {
        fromSelf: t,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    let { from, to, message } = req.body;
    from = await User.findOne({username: from})
    to = await User.findOne({username: to})
    const data = await Message.create({
      message: { text: message },
      users: [from._id, to._id],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ username: {$ne : req.params.id}}).select([
      "email",
      "username",
      "_id",
    ]);
    //console.log(users)
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
}