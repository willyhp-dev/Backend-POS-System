const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../user/model");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { getToken } = require("../../utils");

const register = async (req, res, next) => {
  const payload = req.body;
  try {
    let user = new User(payload);
    await user.save();
    return res.json(user);
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next();
  }
};
const localStrategy = async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select(
      "-__v -createdAt -updatedAt -card_items -token"
    );
    if (!user) return done();
    if (bcrypt.compareSync(password, user.password)) {
      ({ password, ...userWithoutPassword } = user.toJSON());
      return done(null, userWithoutPassword);
    }
  } catch (error) {
    done(error, null);
  }
  done();
};
const login = async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      return res.json({ error: 1, message: err.message });
    } else {
      let signed = jwt.sign(user, config.secretkey);
      await User.findByIdAndUpdate(user._id, { $push: { token: signed } });
      res.json({
        message: "Login Successfully",
        user,
        token: signed,
      });
    }
    next();
  })(req, res, next);
};
const logout = async (req, res) => {
  try {
    let token = getToken(req);
    let user = await User.findOneAndUpdate(
      { token: { $in: [token] } },
      { $pull: { token: token } },
      { useFindAndModify: false }
    );
    if (!token || !user) {
      res.json({
        error: 1,
        message: "Not User Found!!!",
      });
    }
    return res.json({
      error: 0,
      message: "Logout Berhasil",
    });
  } catch (error) {
    res.json(error);
  
  }
 
};
const me = (req, res, next) => {
  try {
    if (!req.user) {
      res.json({
        error: 1,
        message: `You're not Login or token expired`,
      });
    }
    res.json(req.user);
  } catch (error) {
    res.json(error);
  }
  next(error);
};
const getdata = async (req, res) => {
  let count = await User.find().countDocuments();
  await User.find()
    .then((result) =>
      res.json({
        data: result,
        count:count
      })
    )
    .catch((error) => res.json(error));
};
module.exports = {
  register,
  localStrategy,
  login,
  logout,
  me,
  getdata,
};
