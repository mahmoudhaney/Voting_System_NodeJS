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

                const query = util.promisify(connection.query).bind(connection);
                await query("insert into elections set ? ", election);
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

                    const query = util.promisify(connection.query).bind(connection);
                    await query("update elections set ? where id = ? ", [editedElection, req.params.id]);
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
                await query("delete from elections where id = ? ", [req.params.id]);
                res.status(200).json({msg: "Election Deleted Successfully",});
            }
        } catch (error) {
            res.status(500).json(error);
        }
});

// List all elections
router.get("", async (req, res) => {
    try {
        let search = "";
        if (req.query.search) {
            search = `where name LIKE '%${req.query.search}%'`
        }

        const query = util.promisify(connection.query).bind(connection);
        const elections = await query(`select * from elections ${search}`);
        res.status(200).json(elections);
    } catch (error) {
        res.status(500).json(error);
    }
});

// List Elections History
router.get("/history", async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const elections = await query(`select * from elections where is_active = 0;`);
        res.status(200).json(elections);
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
            const query = util.promisify(connection.query).bind(connection);
            const election = await query("select * from elections where id = ? ", [req.params.id]);
            res.status(200).json(election[0]);
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
                        const query = util.promisify(connection.query).bind(connection);
                        const candidate = await query(`select num_of_votes from candidates where ID = ${req.body.candidate_id};`);
                        const votesNumber = candidate[0].num_of_votes + 1;
                        await query(`update candidates set num_of_votes = ${votesNumber} where ID = ${req.body.candidate_id}`);
                        await query(`update users set voted = 1 where ID = ${res.locals.voter.ID}`);
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
                    const query = util.promisify(connection.query).bind(connection);
                    await query(`update elections set is_active = 0 where elections.ID = ${req.params.id};`);

                    election = await query(`select elections.ID, elections.name, elections.start_date, elections.end_date,
                    SUM(candidates.num_of_votes) As Total_Votes from candidates 
                    Right Join elections 
                    ON candidates.election_id = elections.ID 
                    WHERE elections.ID = ${req.params.id}
                    Group by elections.name;`);

                    const electionCandidates = await query(`select * from votingsystem.candidates where election_id = ${req.params.id};`);

                    const electionWinner = await query(`select candidates.name, candidates.num_of_votes FROM candidates
                    LEFT JOIN elections
                    ON candidates.election_id = elections.ID 
                    WHERE candidates.num_of_votes = ( SELECT MAX( candidates.num_of_votes) from candidates );`);
                    
                    election[0].candidates = electionCandidates;
                    election[0].winner = electionWinner[0];

                    res.status(200).json(election[0]);
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
);

module.exports = router;