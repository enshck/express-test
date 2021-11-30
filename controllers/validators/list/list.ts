import Joi from "joi";

export default Joi.object({
  description: Joi.string().min(1).required(),
  elementId: Joi.string().required(),
  userId: Joi.string().required(),
});
