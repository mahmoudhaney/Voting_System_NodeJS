const connection = require('../db/connection');
const util = require("util");


const authorized = async (req, res, next) => {
    const query = util.promisify(connection.query).bind(connection);
    const { email } = req.headers;
    const voter = await query("select * from voter where Email = ? ", [email]);
    if (voter[0] && voter[0].roleId == 2){
        res.locals.voter = voter[0];
        next();
    } else {
        res.status(403).json({msg: "you are not authorized",});
    }
};

module.exports = authorized;