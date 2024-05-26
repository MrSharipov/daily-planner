const Plan = require("../../db/models/plan.model");
const handleError = require("../../helpers/error.service");

const create = async (data) => {
  const now = new Date();
  const dateFromTimestamp = new Date(data.deadline);

  if (now.getTime() > dateFromTimestamp) {
    throw new Error("Deadline is expired");
  }

  try {
    const newPlan = new Plan({
      title: data.title,
      deadline: data.deadline,
      isCompleted: false,
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

const getAll = async () => {
  return await Plan.find();
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

  const result = await update(id, { isCompleted: true });
  return result;
};

module.exports = {
  create,
  getById,
  update,
  remove,
  getAll,
  makeCompelted,
};
