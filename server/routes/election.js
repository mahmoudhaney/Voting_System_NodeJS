const router = require("express").Router();
const connection = require('../db/connection');
const admin = require('../middleware/admin');
const authorized = require('../middleware/authorized')
const {body, validationResult} = require("express-validator");
const util = require("util");

// Create New Election
router.post(
    "", 
    admin, 
    body("name").isString().withMessage("please enter a valid name"), 
    body("start_date"),
    body("end_date"),
    async (req, res) => {
        try {
            // 1- Valid Request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            // 2- Prepare movie object
            const election = {
                name: req.body.name,
                elec_start_date: req.body.start_date,
                elec_end_date: req.body.end_date,
                // admin_id: res.locals.admin.ID,
            };

            // 3- Insert movie object into Database
            const query = util.promisify(connection.query).bind(connection);
            await query("insert into election set ? ", election);
            res.status(200).json({msg: "Election Created Successfully",});
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
            // 1- Valid Request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            // 2- Check if the election exist
            const query = util.promisify(connection.query).bind(connection);
            const election = await query("select * from election where id = ? ", [req.params.id]);
            if (!election[0]) {
                res.status(404).json({msg: "election not found"});
            }

            // 3- Prepare election object
            const editedElection = {
                name: req.body.name,
                elec_start_date: req.body.start_date,
                elec_end_date: req.body.end_date,
                // admin_id: res.locals.admin.ID,
            };

            // 4- Update the movie            
            await query("update election set ? where id = ? ", [editedElection, election[0].ID]);
            res.status(200).json({msg: "Election Updated Successfully",});
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
            // 1- Check if the election exist
            const query = util.promisify(connection.query).bind(connection);
            const election = await query("select * from election where id = ? ", [req.params.id]);
            if (!election[0]) {
                res.status(404).json({msg: "election not found"});
            }

            // 2- Delete the election            
            await query("delete from election where id = ? ", [election[0].ID]);
            res.status(200).json({msg: "Election Deleted Successfully",});
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
});


// List all elections
router.get("", async (req, res) => {
    const query = util.promisify(connection.query).bind(connection);
    let search = "";
    if (req.query.search) {
        search = `where name LIKE '%${req.query.search}%'`
    }
    const elections = await query(`select * from election ${search}`);
    res.status(200).json(elections);
});

// List Elections History
router.get("/history", async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const elections = await query(`select * from election where isActive = 0;`);
        res.status(200).json(elections);
    } catch (error) {
        res.status(500).json(error);
    }
    
});

// Show a specific election
router.get("/:id", async (req, res) => {
    // 1- Check if the election exist
    const query = util.promisify(connection.query).bind(connection);
    const election = await query("select * from election where id = ? ", [req.params.id]);
    if (!election[0]) {
        res.status(404).json({msg: "election not found"});
    }
    res.status(200).json(election[0]);
});

// Vote
router.put(
    "/vote/:id", 
    authorized,
    body("candidate_id").isNumeric().withMessage("enter a valid candidate ID"),
    async (req, res) => {
        try {
            // 1- Valid Request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            const query = util.promisify(connection.query).bind(connection);

            // 2- Check if the election exist
            const election = await query("select * from election where id = ? ", [req.params.id]);
            if (!election[0]) {
                res.status(404).json({msg: "election not found"});
            }

            // 2- Check if the candidate exist
            const candidate = await query("select * from candidate where id = ? ", [req.body.candidate_id]);
            if (!candidate[0]) {
                res.status(404).json({msg: "candidate not found"});
            }

            // 3- Doing the voting logic
            const votesNumber = candidate[0].num_of_votes + 1;
            await query(`update candidate set num_of_votes = ${votesNumber} where ID = ${candidate[0].ID}`);
            await query(`update voter set voted = 1 where ID = ${res.locals.voter.ID}`);

            res.status(200).json({msg: "Voted Successfully"});
        } catch (error) {
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
            // 1- Valid Request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            // 2- Check if the election exist
            const query = util.promisify(connection.query).bind(connection);
            let election = await query("select * from election where id = ? ", [req.params.id]);
            if (!election[0]) {
                res.status(404).json({msg: "election not found"});
            }

            // 3- The Result Logic
            await query(`update election set isActive = 0 where election.ID = ${election[0].ID};`);

            election = await query(`select election.ID, election.name, election.elec_start_date, election.elec_end_date,
            SUM(candidate.num_of_votes) As Total_Votes from candidate 
            Right Join election 
            ON candidate.election_id = election.ID 
            WHERE election.ID = ${election[0].ID} 
            Group by election.name;`);

            const candidates = await query(`select * from votingsystem.candidate where election_id = ${election[0].ID};`);

            const winner = await query(`select candidate.name,candidate.num_of_votes FROM candidate 
            LEFT JOIN election 
            ON candidate.election_id = election.ID 
            WHERE candidate.num_of_votes = ( SELECT MAX( candidate.num_of_votes) from candidate );`);
            
            election[0].candidatess = candidates;
            election[0].winner = winner[0];

            res.status(200).json(election[0]);
        } catch (error) {
            res.status(500).json(error);
        }
    }

);





module.exports = router;