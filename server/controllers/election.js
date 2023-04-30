const router = require("express").Router();
const connection = require('../db/connection');
const admin = require('../middleware/admin');
const authorized = require('../middleware/authorized')
const {body, validationResult} = require("express-validator");
const util = require("util");
const { Election } = require("../models/Election");
const { User } = require("../models/User");
const { Candidate } = require("../models/Candidate");

// Create New Election
router.post(
    "", 
    admin, 
    body("name").isString().withMessage("please enter a valid name"), 
    body("start_date"),
    body("end_date"),
    async (req, res) => {
        try {
            if (!validationResult(req).isEmpty()) {
                res.status(400).json({errors: validationResult(req).array()});
            } else {
                const election = new Election();
                delete election.ID;
                election.setName(req.body.name);
                election.setStartDate(req.body.start_date);
                election.setEndDate(req.body.end_date);
                election.setIsActive(1);
                election.setAdminId(res.locals.admin.ID);

                await Election.Add(election);
                res.status(200).json({msg: "Election Created Successfully",});
            }
        } catch (error) {
            res.status(500).json(error);
        }
});

// Update a specific election
router.put(
    "/:id", 
    admin, 
    body("name").isString().withMessage("please enter a valid name"), 
    body("start_date"),
    body("end_date"),
    async (req, res) => {
        try {
            if (!validationResult(req).isEmpty()) {
                res.status(400).json({errors: validationResult(req).array()});
            } else {
                if (!await Election.IsExist(req.params.id)) {
                    res.status(404).json({msg: "election not found !"});
                } else if (!await Election.IsActive(req.params.id)) {
                    res.status(400).json({msg: "this election is over !"});
                } else {
                    const editedElection = new Election();
                    delete editedElection.ID;
                    delete editedElection.is_active;
                    editedElection.setName(req.body.name);
                    editedElection.setStartDate(req.body.start_date);
                    editedElection.setEndDate(req.body.end_date);
                    editedElection.setAdminId(res.locals.admin.ID);

                    await Election.Update( editedElection, req.params.id);
                    res.status(200).json({msg: "Election Updated Successfully",});
                }
            }            
        } catch (error) {
            res.status(500).json(error);
        }
});

// Delete a specific election
router.delete(
    "/:id", 
    admin, 
    async (req, res) => {
        try {
            if (!await Election.IsExist(req.params.id)) {
                res.status(404).json({msg: "election not found !"});
            } else {
                const query = util.promisify(connection.query).bind(connection);   
                await Election.Delete(req.params.id);
                res.status(200).json({msg: "Election Deleted Successfully",});
            }
        } catch (error) {
            res.status(500).json(error);
        }
});

// List all elections
router.get("", async (req, res) => {
    try {
        res.status(200).json(await Election.getElections(req.query.search));
    } catch (error) {
        res.status(500).json(error);
    }
});

// List Elections History
router.get("/history", async (req, res) => {
    try {
        res.status(200).json(await Election.getHistory());
    } catch (error) {
        res.status(500).json(error);
    }
    
});

// Show a specific election
router.get("/:id", async (req, res) => {
    try {
        if (!await Election.IsExist(req.params.id)) {
            res.status(404).json({msg: "election not found !"});
        } else {
            res.status(200).json(await Election.getElection(req.params.id));
        }
    } catch (error) {
        res.status(500).json(error);
    }    
});

// Vote
router.put(
    "/vote/:id", 
    authorized,
    body("candidate_id").isNumeric().withMessage("enter a valid candidate ID"),
    async (req, res) => {
        try {
            if (!validationResult(req).isEmpty()) {
                res.status(400).json({errors: validationResult(req).array()});
            } else if (await User.IsVoted(res.locals.voter.ID)){
                return res.status(400).json({msg: "you've already voted before"});
            } else {
                if (!await Election.IsExist(req.params.id)) {
                    res.status(404).json({msg: "election not found !"});
                } else if (!await Election.IsActive(req.params.id)) {
                    res.status(400).json({msg: "this election is over !"});
                } else {
                    if (!await Candidate.IsExist(req.body.candidate_id)) {
                        res.status(404).json({msg: "candidate not found !"});
                    } else if (!await Candidate.IsNominated(req.params.id, req.body.candidate_id)) {
                        res.status(404).json({msg: "this candidate isn't nominated in this election !"});
                    } else {
                        await User.Vote(req.body.candidate_id, res.locals.voter.ID)
                        res.status(200).json({msg: "Voted Successfully"});
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
);

// Election Result
router.put(
    "/result/:id", 
    admin,
    async (req, res) => {
        try {
            if (!validationResult(req).isEmpty()) {
                res.status(400).json({errors: validationResult(req).array()});
            } else {
                if (!await Election.IsExist(req.params.id)) {
                    res.status(404).json({msg: "election not found !"});
                } else if (!await Election.IsActive(req.params.id)) {
                    res.status(400).json({msg: "this election is over !"});
                } else {
                    await Election.endElection(req.params.id);
                    let election = await Election.electionTotalVotes(req.params.id);             
                    election[0].candidates = await Candidate.electionCandidates(req.params.id);
                    election[0].winner = await Candidate.Winner(req.params.id);
                    res.status(200).json(election[0]);
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
);

module.exports = router;