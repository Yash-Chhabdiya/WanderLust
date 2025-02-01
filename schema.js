// const Joi = require("joi");
const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        "image.url": joi.string().allow("",null),
        // image: joi.object({
        //     url: joi.string().allow("", null), // Allow empty or null values, or a valid URI
        //     // filename: joi.string().allow("", null), // Optional filename
        // }).optional()
    }).required()
});
module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required()
    }).required(),
})