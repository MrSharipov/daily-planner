const Plan = require("../../db/models/plan.model");
const handleError = require("../../helpers/error.service");

const create = async (data) => {
  const now = new Date();
  const dateFromTimestamp = new Date(data.deadline);

  if (now.getTime() > dateFromTimestamp) {
    throw new Error("You can't create a plan with old date");
  }

  try {
    const newPlan = new Plan({
      title: data.title,
      deadline: data.deadline,
      isCompleted: false,
      userId: data.userId,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    await newPlan.save();
    return newPlan;
  } catch (err) {
    console.error(err, "plans.service");
    return handleError(err.message, 500, err.name);
  }
};

const update = async (id, data) => {
  return Plan.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const remove = async (id) => {
  return Plan.findByIdAndDelete(id);
};

const getById = async (id) => {
  return await Plan.findById(id);
};

const getAll = async (userId) => {
  return Plan.find({userId: userId});
};

const makeCompelted = async (id) => {
  const plan = await getById(id);
  if (!plan) {
    throw new Error("Plan is not found");
  }
  const now = new Date();
  const dateFromTimestamp = new Date(plan.deadline);

  if (now.getTime() > dateFromTimestamp) {
    throw new Error("Deadline is expired");
  }

  return await update(id, {isCompleted: true});
};

module.exports = {
  create,
  getById,
  update,
  remove,
  getAll,
  makeCompelted,
};
