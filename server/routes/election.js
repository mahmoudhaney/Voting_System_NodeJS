const router = require("express").Router();
const connection = require('../db/connection');
const admin = require('../middleware/admin');
const authorized = require('../middleware/authorized')
const {body, validationResult} = require("express-validator");
const util = require("util");

// ==================== Admin ====================
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


// ==================== Admin & User ====================
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



module.exports = router;