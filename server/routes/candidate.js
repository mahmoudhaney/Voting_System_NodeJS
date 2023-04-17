const router = require("express").Router();
const connection = require('../db/connection');
const admin = require('../middleware/admin');
const upload = require('../middleware/uploadImages');
const {body, validationResult} = require("express-validator");
const util = require("util");
const fs = require("fs");

// ==================== Admin ====================
// Add candidate
router.post(
    "", 
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

            // 2- Validate the image
            if(!req.file){
                return res.status(400).json({
                    errors: [{msg: "Image is Required",},],
                });
            }

            // 3- Prepare candidate object
            const candidate = {
                name: req.body.name,
                Email: req.body.email,
                Mobile: req.body.mobile,
                photo: req.file.filename,
                election_id: req.body.election,
            };

            // 4- Insert candidate object into Database
            const query = util.promisify(connection.query).bind(connection);
            await query("insert into candidate set ? ", candidate);
            res.status(200).json({msg: "Candidate added Successfully",});
        } catch (error) {
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
            const candidate = await query("select * from candidate where id = ? ", [req.params.id]);
            if (!candidate[0]) {
                res.status(404).json({msg: "candidate not found"});
            }

            // 3- Prepare movie object
            const editedCandidate = {
                name: req.body.name,
                Email: req.body.email,
                Mobile: req.body.mobile,
                photo: req.file.filename,
                election_id: req.body.election,
            };
            
            if(req.file){
                editedCandidate.photo = req.file.filename;
                fs.unlinkSync("./uploads/" + candidate[0].photo); // Delete the old image
            }

            // 4- Update the movie            
            await query("update candidate set ? where id = ? ", [editedCandidate, candidate[0].ID]);
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
            const candidate = await query("select * from candidate where id = ? ", [req.params.id]);
            if (!candidate[0]) {
                res.status(404).json({msg: "candidate not found"});
            }

            // 2- Delete the image first from folder upload
            fs.unlinkSync("./uploads/" + candidate[0].photo);

            // 3- Delete the candidate            
            await query("delete from candidate where id = ? ", [candidate[0].ID]);
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
    const candidates = await query(`select * from candidate ${search}`);
    candidates.map((candidate) => {
        candidate.photo = "http://" + req.hostname + ":5000/" + candidate.photo;
    });
    res.status(200).json(candidates);
});

// Show a specific candidate
router.get("/:id", async (req, res) => {
    // 1- Check if the candidate exist
    const query = util.promisify(connection.query).bind(connection);
    const candidate = await query("select * from candidate where id = ? ", [req.params.id]);
    if (!candidate[0]) {
        res.status(404).json({msg: "candidate not found"});
    }
    candidate[0].photo = "http://" + req.hostname + ":5000/" + candidate[0].photo;
    res.status(200).json(candidate[0]);
});


module.exports = router;