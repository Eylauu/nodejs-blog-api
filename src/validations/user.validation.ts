import * as Joi from '@hapi/joi';

export const SigninValidations = {
    email: Joi.string()
        .min(5)
        .max(30)
        .email()
        .required(),
    password: Joi.string()
        .min(4)
        .max(1024)
        .required()
};

export const SignupValidations = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(50)
        .required(),
    email: Joi.string()
        .min(5)
        .max(30)
        .email()
        .required(),
    password: Joi.string()
        .min(4)
        .max(1024)
        .required(),
    confirmPassword: Joi.ref('password')
});

export const UpdateValidations = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(50),
    email: Joi.string()
        .min(5)
        .max(30)
        .email(),
    password: Joi.string()
        .min(4)
        .max(1024)
});