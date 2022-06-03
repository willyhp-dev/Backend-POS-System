const { getToken,policiesuser } = require('../utils/index');
const jwt = require('jsonwebtoken');
const config = require('../app/config');
const User = require('../app/user/model');

 function decodeToken() {
    return async function (req, res, next) {
       try {
        let token = getToken(req);
        if (!token) return next();
        req.user = jwt.verify(token, config.secretkey);
        let user = await User.findOne({ token: { $in: [token] } });

        if (!user) {
            res.json({
                error: 1,
                message: 'Token Expired'
            });
        }
       } catch (error) {
           if (error && error.name === 'JsonWebTokenError') {
                res.json({
                   error: 1,
                   message:error.message
               })
               next(error);
           }
           next();
        }
        return next();
    }
}
function police_check(action, subject) {
    return function (req, res, next) {
        let policy = policiesuser(req.user);
      
        if (!policy.can(action, subject)) {
            return res.json({
                error: 1,
                message: `You are not allowed to ${action} ${subject}`
            });
        }
        next();
    }
}

module.exports = {
    decodeToken,
    police_check
}
