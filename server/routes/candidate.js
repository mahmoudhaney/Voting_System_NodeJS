const router = require("express").Router();
const connection = require('../db/connection');
const admin = require('../middleware/admin');
const upload = require('../middleware/uploadImages');
const {body, validationResult} = require("express-validator");
const util = require("util");
const fs = require("fs");
const { Candidate } = require('../models/Candidate')

// ==================== Admin ====================
// Add candidate
router.post(
    "", 
    admin, 
    upload.single("image"),
    body("name").isString().withMessage("please enter a valid name"), 
    body("mobile").isNumeric().withMessage("enter a valid ID").isLength(11).withMessage("Number must be 11 digits"),
    body("email").isEmail().withMessage("enter a valid email!"), 
    body("election_id").isNumeric().withMessage("enter a valid election ID !"),
    async (req, res) => {
        try {
            // 1- Valid Request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            // 3- Check if email exists
            const query = util.promisify(connection.query).bind(connection);
            const emailExist = await query("select * from candidates where email = ?", [req.body.email]);
            if(emailExist.length > 0){
                res.status(400).json({
                    errors: [{msg: "email already exist !"},],
                });
            }

            // 2- Check if the chosen election exist and still running
            const election = await query("select * from elections where id = ? ", [req.body.election_id]);
            if (!election[0]) {
                return res.status(404).json({msg: "election not found"});
            }
            if (!election[0].is_active) {
                return res.status(404).json({msg: "this election is over"});
            }

            // 2- Validate the image
            if(!req.file){
                return res.status(400).json({
                    errors: [{msg: "Image is Required",},],
                });
            }

            // 3- Prepare candidate object
            const candidate = new Candidate();
            delete candidate.ID;
            candidate.setName(req.body.name);
            candidate.setEmail(req.body.email);
            candidate.setMoblie(req.body.mobile);
            candidate.setPhoto(req.file.filename);
            candidate.setNumOfVotes(0);
            candidate.setElectionId(req.body.election_id);
            candidate.setAdminId(res.locals.admin.ID);

            // 4- Insert candidate object into Database
            await query("insert into candidates set ? ", candidate);
            res.status(200).json({msg: "Candidate added Successfully",});
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
});

// Update a specific candidate
router.put(
    "/:id", 
    admin, 
    upload.single("image"),
    body("name").isString().withMessage("please enter a valid name"), 
    body("mobile").isNumeric().withMessage("enter a valid ID").isLength(11).withMessage("Number must be 11 digits"),
    body("email").isEmail().withMessage("enter a valid email!"), 
    body("election").isNumeric().withMessage("enter a valid election!"),
    async (req, res) => {
        try {
            // 1- Valid Request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            // 2- Check if the candidate exist
            const query = util.promisify(connection.query).bind(connection);
            const candidate = await query("select * from candidates where id = ? ", [req.params.id]);
            if (!candidate[0]) {
                res.status(404).json({msg: "candidate not found"});
            }

            // 3- Prepare movie object
            const editedCandidate = new Candidate();
            delete editedCandidate.ID;
            delete editedCandidate.num_of_votes;
            editedCandidate.setName(req.body.name);
            editedCandidate.setEmail(req.body.email);
            editedCandidate.setMoblie(req.body.mobile);
            editedCandidate.setPhoto(req.file.filename);
            editedCandidate.setElectionId(req.body.election_id);
            editedCandidate.setAdminId(res.locals.admin.ID);
            
            if(req.file){
                editedCandidate.photo = req.file.filename;
                fs.unlinkSync("./uploads/" + candidate[0].photo); // Delete the old image
            }

            // 4- Update the movie            
            await query("update candidates set ? where id = ? ", [editedCandidate, candidate[0].ID]);
            res.status(200).json({msg: "Candidate Updated Successfully",});
        } catch (error) {
            res.status(500).json(error);
        }
});

// Delete a specific movie
router.delete(
    "/:id", 
    admin, 
    async (req, res) => {
        try {
            // 1- Check if the candidate exist
            const query = util.promisify(connection.query).bind(connection);
            const candidate = await query("select * from candidates where id = ? ", [req.params.id]);
            if (!candidate[0]) {
                res.status(404).json({msg: "candidate not found"});
            }

            // 2- Delete the image first from folder upload
            fs.unlinkSync("./uploads/" + candidate[0].photo);

            // 3- Delete the candidate            
            await query("delete from candidates where id = ? ", [candidate[0].ID]);
            res.status(200).json({msg: "Candidate Deleted Successfully",});
        } catch (error) {
            res.status(500).json(error);
        }
});


// ==================== Admin & User ====================
// List all candidates
router.get("", async (req, res) => {
    const query = util.promisify(connection.query).bind(connection);
    let search = "";
    if (req.query.search) {
        search = `where name LIKE '%${req.query.search}%'`
    }
    const candidates = await query(`select * from candidates ${search}`);
    candidates.map((candidate) => {
        candidate.photo = "http://" + req.hostname + ":5000/" + candidate.photo;
    });
    res.status(200).json(candidates);
});

// Show a specific candidate
router.get("/:id", async (req, res) => {
    // 1- Check if the candidate exist
    const query = util.promisify(connection.query).bind(connection);
    const candidate = await query("select * from candidates where id = ? ", [req.params.id]);
    if (!candidate[0]) {
        res.status(404).json({msg: "candidate not found"});
    }
    candidate[0].photo = "http://" + req.hostname + ":5000/" + candidate[0].photo;
    res.status(200).json(candidate[0]);
});


module.exports = router;