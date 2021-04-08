const jwt = require("jsonwebtoken");
const joi = require("joi");

const response = require("../helpers/response");

const { userModel } = require("../data/model");

module.exports = {
  login: async (req, res) => {
    const { body } = req;
    console.log(body);
    try {
      // validate body
      const { value, error } = joi
        .object({
          email: joi.string().email().required(),
          password: joi.string().required(),
        })
        .options({ stripUnknown: true })
        .validate(body);
      if (error) return response.unauthorized(res, error.message);

      const userData = await userModel.findOne({ ...value });
      console.log(userData);
      if (!userData)
        return response.badrequest(res, "email or password incorrect");
      return response.ok(
        res,
        {
          token: generateToken({
            _id: userData._id,
            userId: userData.userId,
            name: userData.name,
            email: userData.email,
            role: userData.role,
          }),
        },
        "login succesful"
      );
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  isAuthenticated: async (req, res, next) => {
    const authorization = req.header("authorization");
    console.log(authorization);
    if (!authorization) response.unauthorized(res, "unauthorized");

    const [type, token] = authorization.split(" ");
    if (!type || !token) response.unauthorized(res, "unauthorized");

    const { data, message } = verifyToken(token);
    if (!data) response.unauthorized(res, message);

    req.user = data;
    next();
  },
};

const generateToken = (dataUser) => {
  return jwt.sign(dataUser, "tokensecreat", {
    expiresIn: `8h`,
  });
};

const verifyToken = (token, secreatToken = "tokensecreat") => {
  try {
    const data = jwt.verify(token, secreatToken);
    return {
      data,
      message: "token valid",
    };
  } catch (error) {
    return {
      data: null,
      message: error.message,
    };
  }
};
