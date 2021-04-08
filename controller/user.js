// Library init
const { isValidObjectId, Error } = require("mongoose");
const joi = require("joi");

const response = require("../helpers/response");

const { userModel } = require("../data/model");

module.exports = {
  getUsers: async (req, res) => {
    console.log(req.query);

    try {
      // validate filter
      const { value, error } = filter.validate(req.query);

      if (error) return response.badrequest(res, error.message);

      const limit = value.limit;
      const offset = value.offset;
      delete value.limit;
      delete value.offset;
      console.log(value);
      if (value.class) {
        value.class = { $regex: value.class, $options: "i" };
      } else {
        delete value.class;
      }

      // query get
      const userData = await userModel
        .find({
          ...value,
          name: { $regex: value.name, $options: "i" },
        })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(offset);
      const total = await userModel.countDocuments();
      response.ok(res, userData, "success", limit, offset, total);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  addUser: async (req, res) => {
    const { body } = req;

    try {
      // validating input user
      const { value, error } = addBodySchema.validate(body);

      if (error) return response.badrequest(res, error.message);
      const checkUser = await userModel.findOne({ userId: value.userId });
      if (checkUser) return response.badrequest(res, "user id exist");

      // query insert
      const user = new userModel(value);
      const userData = await user.save();

      return response.ok(res, userData, "berhasil ditambah");
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  updateUsersClass: async (req, res) => {
    const { body } = req;
    try {
      // validation input
      const { value, error } = joi
        .object({
          ids: joi.array().items(joi.string().required()).required(),
          class: joi.string().required(),
        })
        .validate(body);
      if (error) return response.badrequest(res, error.message);

      // query update
      const updateUsers = await userModel.updateMany(
        { _id: value.ids },
        { class: value.class }
      );
      return response.ok(res, updateUsers, "update user's class succesful");
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  getSiswaMasalah: async (req, res) => {
    const { query, user } = req;
    try {
      // validate filter
      const { value, error } = filter.validate(query);

      if (error) return response.badrequest(res, error.message);

      const limit = value.limit;
      const offset = value.offset;
      delete value.limit;
      delete value.offset;
      console.log(value);
      if (value.class) {
        value.class = { $regex: value.class, $options: "i" };
      } else {
        delete value.class;
      }

      // query get
      const userData = await userModel
        .find({
          ...value,
          counseling: { $elemMatch: { role: user.role } },
          name: { $regex: value.name, $options: "i" },
          role: 1,
        })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(offset);

      const total = await userModel.countDocuments({
        counseling: { $elemMatch: { role: 3 } },
      });

      response.ok(res, userData, "sss", limit, offset, total);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  id: {
    getUser: async (req, res) => {
      const { userid } = req.params;
      try {
        const userData = await userModel.findOne({ userId: userid });

        response.ok(
          res,
          userData,
          userData ? "data found" : "data not found",
          1,
          1,
          1
        );
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    },
    updateUser: async (req, res) => {
      const { _id } = req.params;
      const { body } = req;
      try {
        // validating input user
        if (!isValidObjectId(_id))
          return response.badrequest(res, "data id not valid");
        const { value, error } = updateBodySchema.validate(body);
        if (error) return response.badrequest(res, error.message);

        const userData = await userModel.findOneAndUpdate(
          { _id },
          { ...value }
        );

        return response.ok(
          res,
          userData,
          userData ? "updated succesful" : "data not found",
          1,
          1,
          1
        );
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    },
    deleteUser: async (req, res) => {
      const { _id } = req.params;
      try {
        // validating input user
        if (!isValidObjectId(_id))
          return response.badrequest(res, "data id not valid");

        const userData = await userModel.findOneAndDelete({ _id });
        return response.ok(
          res,
          userData,
          userData ? "delet succesful" : "data not found",
          1,
          1,
          1
        );
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    },
    counseling: async (req, res) => {
      const { body, user } = req;

      try {
        const { value, error } = joi
          .object({
            _id: joi.string().required(),
            counseling: joi.string().default(""),
            status: joi.string().default("pass"),
          })
          .options({ stripUnknown: true })
          .validate(body);

        if (error) return response.badrequest(res, error.message);
        if (!isValidObjectId(value._id))
          return response.badrequest(res, "data id not valid");

        const userData = await userModel.findById(value._id);
        if (!userData) return response.ok(res, null, "data not found");

        if (userData._doc.counseling) {
          let newData = [
            ...userData._doc.counseling,
            {
              desc: value.counseling,
              date: new Date(),
              pic: user._id,
              status: value.status,
            },
          ];
          if (value.status == "pass" && user.role <= 4) {
            // newData = newData.filter((val) => !val.role);
            // newData = [...newData, { role: user.role + 1 }];
            console.log(value);
            newData = newData.map((val) => {
              if (val.role) val.role = user.role + 1;
              return val;
            });
          } else if (value.status == "done") {
            newData = newData.filter((val) => !val.role);
          }
          //userData._doc.counseling = [...userData._doc.counseling, ...newData];

          userData.$set({
            counseling: newData,
          });
        } else {
          userData.$set({
            counseling: [
              {
                desc: value.counseling,
                date: new Date(),
                pic: user._id,
              },
              { role: 3 },
            ],
          });
        }
        userData.save();

        return response.ok(res, userData, "update succesful", 1, 1, 1);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    },
  },
};

const addBodySchema = joi
  .object({
    userId: joi.string().required(),
    name: joi.string().required(),
    address: joi
      .object({
        street: joi.string().default("-"),
        zipcode: joi.required(),
      })
      .required(),
    role: joi.number().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(18).required(),
    status: joi.bool().default(true),
  })
  .options({ stripUnknown: true });

const updateBodySchema = joi
  .object({
    userId: joi.string(),
    name: joi.string(),
    address: joi.object({
      street: joi.string(),
      zipcode: joi.string(),
    }),
    role: joi.number(),
    email: joi.string().email(),
    password: joi.string().min(6).max(18),
    class: joi.string(),
    status: joi.string(),
  })
  .options({ stripUnknown: true });

const filter = joi
  .object({
    limit: joi.number().default(10),
    offset: joi.number().default(0),
    class: joi.string(),
    name: joi.string().default(""),
    role: joi.string(),
  })
  .options({ stripUnknown: true });
