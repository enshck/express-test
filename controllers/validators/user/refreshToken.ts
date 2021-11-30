import Joi from "joi";

export default Joi.object({
  refreshToken: Joi.string().trim().required(),
});
