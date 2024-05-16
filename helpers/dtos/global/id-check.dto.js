const {isDocumentId} = require("../../global-fn");
const IdCheckDTO = (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  if (!isDocumentId(id)) {
    throw new Error('id is invalid');
  }
}

module.exports = IdCheckDTO;