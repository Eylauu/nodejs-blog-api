import * as Joi from '@hapi/joi';

export const CreateValidations = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(5)
        .max(40)
        .required(),
    content: Joi.string()
        .min(4)
        .max(10000)
        .required()
});

export const UpdateValidations = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(5)
        .max(40),
    content: Joi.string()
        .min(4)
        .max(10000)
});