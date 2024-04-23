const connection = require('../db/connection');
const util = require("util");

class Election {

    constructor (id, name, start_date, end_date, is_active, admin_id) {
        this.ID = id;
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.is_active = is_active;
        this.admin_id = admin_id;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }

    getStartDate() {
        return this.start_date;
    }
    setStartDate(start_date) {
        this.start_date = start_date;
    }

    getEndDate() {
        return this.end_date;
    }
    setEndDate(end_date) {
        this.end_date = end_date;
    }

    getIsActive() {
        return this.is_active;
    }
    setIsActive(is_active) {
        this.is_active = is_active;
    }

    getAdminId() {
        return this.admin_id;
    }
    setAdminId(admin_id) {
        this.admin_id = admin_id;
    }

    static async IsExist(id) {
        const query = util.promisify(connection.query).bind(connection);
        const election = await query("select * from elections where id = ? ", [id]);
        if (election[0]) {
            return true;
        }
        return false;
    }

    static async IsActive(id) {
        const query = util.promisify(connection.query).bind(connection);
        const election = await query("select is_active from elections where id = ? ", [id]);
        if (election[0].is_active) {
            return true;
        }
        return false;
    }

    static async Add(election) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            await query("insert into elections set ? ", election);
        } catch (error) {
            console.log(error);
        }
    }

    static async Update(editedElection, id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            await query("update elections set ? where id = ? ", [editedElection, id]);
        } catch (error) {
            console.log(error);
        }
    }

    static async Delete(id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            await query("delete from elections where id = ? ", [id]);
        } catch (error) {
            console.log(error);
        }
    }

    static async getElections(search) {
        try {
            if (search) {
                search = `where name LIKE '%${search}%'`
            }
            const query = util.promisify(connection.query).bind(connection);
            const elections = await query(`select * from elections ${search}`);
            return elections;
        } catch (error) {
            console.log(error);
        }
    }

    static async getHistory() {
        try {
            const query = util.promisify(connection.query).bind(connection);
            const elections = await query(`select * from elections where is_active = 0;`);
            return elections;
        } catch (error) {
            console.log(error);
        }
    }

    static async getElection(id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            const election = await query("select * from elections where id = ? ", [id]);
            return election[0];
        } catch (error) {
            console.log(error);
        }
    }

    static async endElection(id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            await query(`update elections set is_active = 0 where elections.ID = ${id};`);
        } catch (error) {
            console.log(error);
        }
    }

    static async electionTotalVotes(id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            const election = await query(`select elections.ID, elections.name, elections.start_date, elections.end_date,
            SUM(candidates.num_of_votes) As Total_Votes from candidates 
            Right Join elections 
            ON candidates.election_id = elections.ID 
            WHERE elections.ID = ${id}
            Group by elections.name;`);
            return election;
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = {Election:Election};