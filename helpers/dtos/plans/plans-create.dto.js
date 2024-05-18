const PlanCreatDto = (title, deadline) => {
  /* Check title */
  if (!title) {
    throw new Error("title is not found");
  }
  if (typeof title !== "string") {
    throw new Error("title is not valid");
  }

  /* Check deadline */
  if (!deadline) {
    throw new Error("deadline is not found");
  }
  if (typeof deadline !== "string") {
    throw new Error("deadline is not valid");
  }
};

module.exports = PlanCreatDto;
