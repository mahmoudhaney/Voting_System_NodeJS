const router = require("express").Router();
const connection = require('../db/connection');
const {body, validationResult} = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// API for Regisration
router.post(
    "/register",
    body("name").isString().withMessage("enter a valid name").isLength({min: 8, max: 25}).withMessage("name range 8 : 25"),
    body("id_proof").isNumeric().withMessage("enter a valid ID").isLength(14).withMessage("ID must be 14 numbers"),
    body("email").isEmail().withMessage("enter a valid email!"),    
    body("password").isLength({min: 8, max: 15}).withMessage("password range 10 : 15"),
    async (req, res) => {
    try {
        // 1- Valid Request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // 2- Check if email exists
        const query = util.promisify(connection.query).bind(connection); //mysql query to promise to use [await/async]
        const emailExist = await query("select * from voter where email = ?", [req.body.email]);

        if(emailExist.length > 0){
            res.status(400).json({
                errors: [{msg: "email already exist !"},],
            });
        }

        // 3- Prepare object User to save
        const user = {
            name: req.body.name,
            id_proof: req.body.id_proof,
            Email: req.body.email,
            Password: await bcrypt.hash(req.body.password, 10),
            roleId: 2,
        }

        // 4- Insert User Object to Database
        await query("insert into voter set ? ", user);

        // delete user.password;
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

// API for Login
router.post(
    "/login",
    body("email").isEmail().withMessage("enter a valid email!"),
    body("password").isLength({min: 8, max: 15}).withMessage("password range 10 : 15"),
    async (req, res) => {
    try {
        // 1- Valid Request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // 2- Check if email exists
        const query = util.promisify(connection.query).bind(connection); //mysql query to promise to use [await/async]
        const user = await query("select * from voter where email = ?", [req.body.email]);
        if(user.length == 0){
            res.status(404).json({
                errors: [{msg: "Invalid email or password !"},],
            });
        }

        // 3- Compare hashed password
        const checkPassword = await bcrypt.compare(req.body.password, user[0].Password);
        if(checkPassword){
            delete user[0].Password;
            res.status(200).json(user[0]);
        } else {
            res.status(404).json({
                errors: [{msg: "Invalid email or password !"},],
            });
        }        
    } catch (error) {
        res.status(500).json({error: error});
    }
});

module.exports = router;