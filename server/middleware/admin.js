const connection = require('../db/connection');
const util = require("util");


const admin = async (req, res, next) => {
    const query = util.promisify(connection.query).bind(connection);
    const { token } = req.headers;
    const admin = await query("select * from voter where roleId = ? ", [token]);
    if (admin[0]){
        res.locals.admin = admin[0];
        next();
    } else {
        res.status(403).json({msg: "you are not authorized",});
    }
};

module.exports = admin;