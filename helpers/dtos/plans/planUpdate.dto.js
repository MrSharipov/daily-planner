const { isDocumentId } = require("../../global-fn");
const PlanUpdateDto = (id, title, deadline) => {
  if (!id) {
    throw new Error("id is not found");
  }

  if (!isDocumentId(id)) {
    throw new Error("id is not valid");
  }
  if (title) {
    if (typeof title !== "string") {
      throw new Error("title is not valid");
    }
  }

  if (deadline) {
    if (typeof deadline !== "string") {
      throw new Error("deadline is not valid");
    }
  }
};

module.exports = {
  PlanUpdateDto,
};
