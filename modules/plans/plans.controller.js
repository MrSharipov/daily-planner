const errorHandle = require("../../helpers/error.service");
const plansService = require("../plans/plans.service");
const PlanCreatDto = require("../../helpers/dtos/plans/plans-create.dto");
const handleError = require("../../helpers/error.service");
const { PlanUpdateDto } = require("../../helpers/dtos/plans/planUpdate.dto");
const IdCheckDTO = require("../../helpers/dtos/global/id-check.dto");

const create = async (req, res) => {
  const { title, deadline } = req.body;
  try {
    PlanCreatDto(title, deadline);
    const newPlan = await plansService.create({ title, deadline });

    return res.json(newPlan);
  } catch (err) {
    console.error(err, "plans.controller");
    return res.json(errorHandle(err.message, 500, err.name));
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
    return res.json(handleError(err.message, 500, err.name));
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    IdCheckDTO(id);
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
    IdCheckDTO(id);
    const user = await userService.getById(id);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.json(handleError(err.message, 500, err.name));
  }
};

const getAll = async (req, res) => {
  const result = await userService.getAll();
  return res.json(result);
};

module.exports = {
  create,
  update,
  remove,
  getById,
  getAll,
};
