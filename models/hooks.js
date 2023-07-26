const handleErrorSave = (error, data, next) => {
  error.status = 400;
  next();
};

const handleUpdateValidate = function (next) {
  this.options.runValidators = true;
  next();
};

module.exports = { handleErrorSave, handleUpdateValidate };
