const mongoose = require("mongoose");

const isDocumentId = (id) => {
  return mongoose.isValidObjectId(id);
}

module.exports = {
  isDocumentId
}