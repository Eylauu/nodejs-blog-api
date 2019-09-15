import * as Joi from '@hapi/joi';

export default Joi.object({
    name: Joi.string()
        .alphanum()
        .min(4)
        .max(20)
        .required()
});