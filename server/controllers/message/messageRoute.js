const {
  deleteMessage,
  getInbox,
  getUnread,
  getSent,
  sendMessage,
  markUnread,
  markRead,
  readAllMessages
} = require("./messageController");

module.exports = function(app) {
  // SENDS A MESSAGE TO A USER, EXPECTS: (name, subject, text) EXAMPLE: ('domoKing, 'Important', 'Hello')
  app.post("/api/message/send", sendMessage);

  // DELETES A PRIVATE MESSAGE, EXPECTS: (id) EXAMPLE: ('t4_axvfgi')
  app.post("/api/message/delete", deleteMessage);

  // MARKS A MESSAGE AS UNREAD, EXPECTS: (id) EXAMPLE: ('t4_axvfgi')
  app.post("/api/message/mark/unread", markUnread);

  // MARKS A MESSAGE AS READ, EXPECTS: (id) EXAMPLE: ('t4_axvfgi')
  app.post("/api/message/mark/read", markRead);

  // MARKS ALL MESSAGES AS READ
  app.post("/api/message/read/all", readAllMessages);

  app.get("/api/message/inbox", getInbox);
  app.get("/api/message/unread", getUnread);
  app.get("/api/message/sent", getSent);
};
