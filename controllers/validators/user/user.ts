import Joi from "joi";

export default Joi.object({
  userName: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});
