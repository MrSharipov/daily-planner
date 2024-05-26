const plansService = require("../plans/plans.service");
const {
  PlanUpdateDto,
  IdCheckDto,
  PlanCreatDto,
  handleError,
} = require("../../helpers");

const create = async (req, res) => {
  const { title, deadline } = req.body;
  try {
    PlanCreatDto(title, deadline);
    const newPlan = await plansService.create({ title, deadline });

    return res.json(newPlan);
  } catch (err) {
    console.error(err, "plans.controller");
    return res.json(handleError(err.message, 500, err.name));
  }
};

const update = async (req, res) => {
  const { title, deadline } = req.body;
  const id = req.params.id;

  try {
    PlanUpdateDto(id, title, deadline);

    const plan = await plansService.getById(id);

    if (!plan) {
      return res.json(handleError("Plan is not found", 500, {}));
    }

    const updatedPlan = await plansService.update(id, {
      title,
      deadline,
    });

    return res.json(updatedPlan);
  } catch (err) {
    console.log(err);
    return res.json(handleError(err.message, 500, err.name));
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    IdCheckDto(id);
    await plansService.remove(id);
    return res.json({
      id,
      removed: true,
    });
  } catch (err) {
    console.log(err);
    return res.json(handleError(err.message, 500, err.name));
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    IdCheckDto(id);
    const plan = await plansService.getById(id);
    return res.json(plan);
  } catch (err) {
    console.log(err);
    return res.json(handleError(err.message, 500, err.name));
  }
};

const getAll = async (req, res) => {
  const result = await plansService.getAll();
  return res.json(result);
};

const makeCompelted = async (req, res) => {
  const { id } = req.params;
  try {
    IdCheckDto(id);
    const completedPlan = await plansService.makeCompelted(id);

    return res.json(completedPlan);
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};

module.exports = {
  create,
  update,
  remove,
  getById,
  getAll,
  makeCompelted,
};
