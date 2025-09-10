import Joi from "joi";

// Example of custom validators if needed
// Replace implementations as appropriate for your app
const objectId = (value: string, helpers: Joi.CustomHelpers) => {
  if (!/^[0-9]+$/.test(value)) return helpers.error("any.invalid");
  return value;
};

export const createResource = {
  body: Joi.object()
    .keys({
      name: Joi.string().required().max(200),
      description: Joi.string().allow("").max(2000),
      category: Joi.string().allow("").max(100),
    })
    .required(),
};

export const listResources = {
  query: Joi.object()
    .keys({
      q: Joi.string(),
      category: Joi.string(),
      sort: Joi.string().valid("created_at", "updated_at", "name"),
      order: Joi.string().valid("asc", "desc"),
      limit: Joi.number().integer().min(1).max(100),
      offset: Joi.number().integer().min(0),
    })
    .required(),
};

export const getResource = {
  params: Joi.object()
    .keys({
      id: Joi.number().integer().positive().required(),
    })
    .required(),
};

export const updateResource = {
  params: Joi.object()
    .keys({
      id: Joi.number().integer().positive().required(),
    })
    .required(),
  body: Joi.object()
    .keys({
      name: Joi.string().max(200),
      description: Joi.string().allow("").max(2000),
      category: Joi.string().allow("").max(100),
    })
    .min(1)
    .required(),
};

export const deleteResource = {
  params: Joi.object()
    .keys({
      id: Joi.number().integer().positive().required(),
    })
    .required(),
};
