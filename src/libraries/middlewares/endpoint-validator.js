const ValidationErrors = require('../error/validation.error');

module.exports = (schemas) => {
  const validationOptions = {
    abortEarly   : false, // abort after the last validation error
    allowUnknown : true, // allow unknown keys that will be ignored
    stripUnknown : true, // remove unknown keys from the validated data
  };

  return (req, res, next) => {
    let errors = null;

    Object.entries(schemas).every(([source, schema]) => {
      if (schema) {
        const { error, value } = schema.validate(
          req[source],
          validationOptions,
        );

        if (error) {
          errors = ValidationErrors.invalidFields(
            error.details.map(({ message }) => message).join('; '),
            source,
          );

          return false;
        }

        req[source] = value;
        return true;
      }
    });

    if (errors) {
      return next(errors);
    }

    return next();
  };
};
