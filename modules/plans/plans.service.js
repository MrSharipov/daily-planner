const Plan = require("../../db/models/plan.model");
const errorHandle = require("../../helpers/error.service");

const create = async (data) => {
  try {
    const newPlan = new Plan({
      title: data.title,
      deadline: data.deadline,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    await newPlan.save();
    return newPlan;
  } catch (err) {
    console.error(err, "plans.service");
    return errorHandle(err.message, 500, err.name);
  }
};

const getTitleById = async (title) => {
  return Plan.findOne({ title: title });
};

const update = async (id, data) => {
  return Plan.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const remove = async (id) => {
  return Plan.findByIdAndDelete(id);
};

module.exports = {
  create,
  getTitleById,
  update,
  remove,
};
