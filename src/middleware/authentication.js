const authenticationMiddleware = async function (req, res, next) {
  console.log("Authentication successfull");
  next();
};

const authenticationMiddleware2 = async function (req, res, next) {
  console.log("success");
  next();
};

module.exports = { authenticationMiddleware, authenticationMiddleware2 };
