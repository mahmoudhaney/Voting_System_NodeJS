const connection = require('../db/connection');
const util = require("util");


const authorized = async (req, res, next) => {
    const query = util.promisify(connection.query).bind(connection);
    const { token } = req.headers;
    const voter = await query("select * from users where token = ? ", [token]);
    if (voter[0]){
        res.locals.voter = voter[0];
        next();
    } else {
        res.status(403).json({msg: "you are not authorized",});
    }
};

module.exports = authorized;