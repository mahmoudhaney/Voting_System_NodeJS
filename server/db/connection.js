const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'sqluser',
  password : '123456',
  database : 'votingsystem',
  port     : '3306'
});
 
connection.connect((err) => {
    if (err) throw err;
    console.log("CONNECTED TO MYSQL");
});
 
module.exports = connection;