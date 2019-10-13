const joi = require('joi')

module.exports.validateUserLogin = joi.object().keys({
    email: joi
        .string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: joi
        .string()
        .min(6)
        .required(),
})

module.exports.validateUserRegister = joi.object().keys({
    userName: joi.string().required(),
    email: joi
        .string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: joi
        .string()
        .min(6)
        .required(),
    vaultToken: joi.string().valid(''),
})
