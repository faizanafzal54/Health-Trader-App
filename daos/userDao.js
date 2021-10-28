const User = require("../models/UserModel");

module.exports = {
  create: async (obj) => {
    try {
      let newUser = new User(obj);
      const response = await newUser.save();
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findOneByEmail: async (email) => {
    try {
      const account = await User.findOne({ email });
      return account;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findOneAndUpdate: async (where, update) => {
    try {
      const response = await User.findOneAndUpdate(where, update);
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findOneWhere: async (where) => {
    try {
      const account = await User.findOne(where);
      return account;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  setRefreshToken: async (id, refreshToken) => {
    try {
      const response = await User.update(
        { refreshToken: refreshToken },
        {
          where: {
            id,
          },
        }
      );
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findByRefreshToken: async (refreshToken) => {
    try {
      const account = await User.findOne({ where: { refreshToken } });
      return account;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  resetPassword: async (id, hash) => {
    try {
      const account = await User.findByPk(id);
      if (account !== null) {
        account.password = hash;
        account.resetPasswordLink = "";
        const user = await account.save();
        return user;
      } else {
        throw new Error("User id is not valid");
      }
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  findByPk: async (id) => {
    try {
      const account = await User.findByPk(id);
      return account;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  updateImage: async (id, image) => {
    try {
      const response = await User.update(
        { image },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  deactivate: async (id) => {
    try {
      const response = await User.update(
        { isActive: false },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  update: async (id, userObj) => {
    try {
      const response = await User.update(
        { ...userObj },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
};
