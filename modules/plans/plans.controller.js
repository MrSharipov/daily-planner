const plansService = require("../plans/plans.service");
const {
  PlanUpdateDto,
  IdCheckDto,
  PlanCreatDto,
  handleError,
} = require("../../helpers");

const create = async (req, res) => {
  const { title, deadline } = req.body;
  const userId = req.userId;
  try {
    IdCheckDto(userId);
    PlanCreatDto(title, deadline);
    const newPlan = await plansService.create({ title, deadline, userId });

    return res.json(newPlan);
  } catch (err) {
    console.error(err, "plans.controller");
    return res.json(handleError(err.message, 500, err.name));
  }
};

const update = async (req, res) => {
  const { title, deadline } = req.body;
  const planId = req.params.id;
  const userId = req.userId;

  try {
    IdCheckDto(userId);
    PlanUpdateDto(planId, title, deadline);

    const plan = await plansService.getById(planId);

    if (!plan) {
      return res.json(handleError("Plan is not found", 500, {}));
    }
    if(userId !== plan.userId.toString()){
      return res.json(handleError("You can't change others' plan", 500, {}));
    }

    const updatedPlan = await plansService.update(planId, {
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
  const userId = req.userId;
  try {
    IdCheckDto(id);
    IdCheckDto(userId);
    const plan = await plansService.getById(id);
    if(!plan){
      throw new Error('Plan is not found');
    }
    if(userId !== plan.userId.toString()){
      throw new Error("You can't remove others' plan");
    }
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
  const userId = req.userId;
  try {
    IdCheckDto(id);
    IdCheckDto(userId);
    const plan = await plansService.getById(id);
    if(!plan) {
      throw new Error('Plan is not found');
    }
    if(userId !== plan?.userId.toString()){
      throw new Error("You can't get others' plan");
    }
    return res.json(plan);
  } catch (err) {
    console.log(err);
    return res.json(handleError(err.message, 500, err.name));
  }
};

const getAll = async (req, res) => {
  const userId = req.userId;
  try{
    IdCheckDto(userId);
    const result = await plansService.getAll(userId);
    return res.json(result);
  }catch (err){
    return res.json(handleError(err.message, 500, {}))
  }

};

const makeCompelted = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    IdCheckDto(id);
    IdCheckDto(userId);
    const plan = await plansService.getById(id);
    if(userId !== plan.userId.toString()){
      throw new Error("You can't change others' plan");
    }
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
