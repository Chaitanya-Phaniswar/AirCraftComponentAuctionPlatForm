const { addMessage, getMessages, getUsers } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg", addMessage);

router.post("/getmsg", getMessages);

router.get("/:id",getUsers)

module.exports = router;