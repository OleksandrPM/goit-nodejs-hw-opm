const handleUpdateValidate = function (next) {
  this.options.runValidators = true;
  next();
};

module.exports = { handleUpdateValidate };
