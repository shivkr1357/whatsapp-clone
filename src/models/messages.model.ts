const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
   chatId: { type: String, required: true },
   senderId: { type: String, required: true },
   receiverId: { type: String, required: true },
   message: { type: String, required: true },
   timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
