const router = require("express").Router();
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User } = require("../models/User");

// Regisration
router.post(
    "/register",
    body("name").isString().withMessage("enter a valid name").isLength({min: 8, max: 25}).withMessage("name range 8 : 25"),
    body("id_proof").isNumeric().withMessage("enter a valid ID").isLength(14).withMessage("ID must be 14 numbers"),
    body("email").isEmail().withMessage("enter a valid email!"),    
    body("password").isLength({min: 8, max: 15}).withMessage("password range 8 : 15"),
    async (req, res) => {
    try {
        if (!validationResult(req).isEmpty()) {
            res.status(400).json({errors: validationResult(req).array()});
        } else if (await User.IsIdProofExist(req.body.id_proof)) {
            res.status(404).json({msg: "id proof already exist !"});
        } else if (await User.IsEmailExist(req.body.email)) {
            res.status(404).json({msg: "email already exist !"});
        } else {
            const user = new User();
            user.setName(req.body.name);
            user.setIdProof(req.body.id_proof);
            user.setEmail(req.body.email);
            user.setPassword(await bcrypt.hash(req.body.password, 10)),
            user.setVoted(0);
            user.setToken(crypto.randomBytes(16).toString("hex"));
            user.setRole(0);

            await User.Add(user);
            res.status(200).json({msg: "Registered Successfully"});
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// Login
router.post(
    "/login",
    body("email").isEmail().withMessage("enter a valid email!"),
    body("password").isLength({min: 8, max: 15}).withMessage("password range 8 : 15"),
    async (req, res) => {
    try {
        if (!validationResult(req).isEmpty()) {
            res.status(400).json({errors: validationResult(req).array()});
        } else if (!await User.IsEmailExist(req.body.email)) {
            res.status(404).json({msg: "Invalid email !"});
        } else if (!await User.CheckPassword(req.body.email, req.body.password)){
            res.status(404).json({msg: "wrong password !"});
        } else {
            res.status(200).json({msg: "Login Successfully"});
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
        res.status(200).json(await User.getUsers());
    } catch (error) {
        res.status(500).json({error: error});
    }
});

module.exports = router;