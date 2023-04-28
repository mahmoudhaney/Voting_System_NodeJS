const router = require("express").Router();
const connection = require('../db/connection');
const {body, validationResult} = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User } = require("../models/User");

// API for Regisration
router.post(
    "/register",
    body("name").isString().withMessage("enter a valid name").isLength({min: 8, max: 25}).withMessage("name range 8 : 25"),
    body("id_proof").isNumeric().withMessage("enter a valid ID").isLength(14).withMessage("ID must be 14 numbers"),
    body("email").isEmail().withMessage("enter a valid email!"),    
    body("password").isLength({min: 8, max: 15}).withMessage("password range 8 : 15"),
    async (req, res) => {
    try {
        // 1- Valid Request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // 2- Check if Id proof exists
        const query = util.promisify(connection.query).bind(connection); //mysql query to promise to use [await/async]
        const idProofExist = await query("select * from users where id_proof = ?", [req.body.id_proof]);
        if(idProofExist.length > 0){
            res.status(400).json({
                errors: [{msg: "id proof already exist !"},],
            });
        }

        // 3- Check if email exists
        const emailExist = await query("select * from users where email = ?", [req.body.email]);
        if(emailExist.length > 0){
            res.status(400).json({
                errors: [{msg: "email already exist !"},],
            });
        }

        // 4- Prepare User object to save
        const user = new User();
        user.setName(req.body.name);
        user.setIdProof(req.body.id_proof);
        user.setEmail(req.body.email);
        user.setPassword(await bcrypt.hash(req.body.password, 10)),
        user.setVoted(0);
        user.setToken(crypto.randomBytes(16).toString("hex"));
        user.setRole(0);

        // 5- Insert User Object to Database
        await query("insert into users set ? ", user);
        res.status(200).json({msg: "Registered Successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// API for Login
router.post(
    "/login",
    body("email").isEmail().withMessage("enter a valid email!"),
    body("password").isLength({min: 8, max: 15}).withMessage("password range 8 : 15"),
    async (req, res) => {
    try {
        // 1- Valid Request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // 2- Check if email exists
        const query = util.promisify(connection.query).bind(connection); //mysql query to promise to use [await/async]
        const user = await query("select * from users where email = ?", [req.body.email]);
        if(user.length == 0){
            res.status(404).json({
                errors: [{msg: "Invalid email or password !"},],
            });
        }

        // 3- Compare hashed password
        const checkPassword = await bcrypt.compare(req.body.password, user[0].password);
        if(checkPassword){
            delete user[0].password;
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

// List All Users
router.get(
    "/users",
    async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const users = await query('select ID, name, id_proof, email, voted, token, role from votingsystem.users;');
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({error: error});
    }
});

module.exports = router;