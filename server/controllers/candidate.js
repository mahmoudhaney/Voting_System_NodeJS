const router = require("express").Router();
const admin = require('../middleware/admin');
const upload = require('../middleware/uploadImages');
const {body, validationResult} = require("express-validator");
const { Candidate } = require('../models/Candidate');
const { Election } = require('../models/Election');

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
            if (!validationResult(req).isEmpty()) {
                res.status(400).json({errors: validationResult(req).array()});
            } else if (await Candidate.IsMobileExist(req.body.mobile)) {
                res.status(400).json({msg: "mobile number already exist !"});
            } else if (await Candidate.IsEmailExist(req.body.email)) {
                res.status(400).json({msg: "email already exist !"});
            } else if (!req.file) {
                res.status(400).json({msg: "Image is Required"});
            } else if (!await Election.IsExist(req.body.election_id)) {
                res.status(404).json({msg: "election not found !"});
            } else if (!await Election.IsActive(req.body.election_id)) {
                res.status(400).json({msg: "this election is over !"});
            } else {
                const candidate = new Candidate();
                delete candidate.ID;
                candidate.setName(req.body.name);
                candidate.setEmail(req.body.email);
                candidate.setMoblie(req.body.mobile);
                candidate.setPhoto(req.file.filename);
                candidate.setNumOfVotes(0);
                candidate.setElectionId(req.body.election_id);
                candidate.setAdminId(res.locals.admin.ID);

                await Candidate.Add(candidate);
                res.status(200).json({msg: "Candidate added Successfully",});
            }
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
    body("election_id").isNumeric().withMessage("enter a valid election!"),
    async (req, res) => {
        try {
            if (!validationResult(req).isEmpty()) {
                res.status(400).json({errors: validationResult(req).array()});
            } else if (!await Candidate.IsExist(req.params.id)) {
                res.status(404).json({msg: "candidate not found !"});
            } else {
                const editedCandidate = new Candidate();
                delete editedCandidate.ID;
                delete editedCandidate.num_of_votes;
                delete editedCandidate.photo;

                if(req.file) {
                    await Candidate.deleteUploadedPhoto(req.params.id);
                    editedCandidate.setPhoto(req.file.filename);
                }

                editedCandidate.setName(req.body.name);
                editedCandidate.setEmail(req.body.email);
                editedCandidate.setMoblie(req.body.mobile);
                editedCandidate.setElectionId(req.body.election_id);
                editedCandidate.setAdminId(res.locals.admin.ID);

                await Candidate.Update(editedCandidate, req.params.id);
                res.status(200).json({msg: "Candidate Updated Successfully",});
            }
        } catch (error) {
            res.status(500).json(error);
        }
});

// Delete a specific candidate
router.delete(
    "/:id", 
    admin, 
    async (req, res) => {
        try {
            if (!await Candidate.IsExist(req.params.id)) {
                res.status(404).json({msg: "candidate not found !"});
            } else {
                await Candidate.deleteUploadedPhoto(req.params.id);
                await Candidate.Delete(req.params.id);
                res.status(200).json({msg: "Candidate Deleted Successfully",});
            }
        } catch (error) {
            res.status(500).json(error);
        }
});

// List all candidates
router.get("", async (req, res) => {
    try {
        const candidates = await Candidate.getCandidates(req.query.search);
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// Show a specific candidate
router.get("/:id", async (req, res) => {
    try {
        if (!await Candidate.IsExist(req.params.id)) {
            res.status(404).json({msg: "candidate not found !"});
        } else {
            res.status(200).json(await Candidate.getCandidate(req.params.id));
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
});


module.exports = router;