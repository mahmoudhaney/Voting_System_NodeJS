const connection = require('../db/connection');
const util = require("util");
const fs = require("fs");

class Candidate {

    constructor (id, name, email, mobile, photo, num_of_votes, election_id, admin_id) {
        this.ID = id;
        this.name = name;
        this.mobile = mobile;
        this.email = email;
        this.photo = photo;
        this.num_of_votes = num_of_votes;
        this.election_id = election_id;
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

    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }

    getMobile() {
        return this.mobile;
    }
    setMoblie(mobile) {
        this.mobile = mobile;
    }

    getPhoto() {
        return this.photo;
    }
    setPhoto(photo) {
        this.photo = photo;
    }

    static async getNumOfVotes(id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            const candidate = await query(`select num_of_votes from candidates where ID = ${id};`);
            return candidate[0].num_of_votes;
        } catch (error) {
            console.log(error);
        }
    }
    setNumOfVotes(num_of_votes) {
        this.num_of_votes = num_of_votes;
    }

    getElectionId() {
        return this.election_id;
    }
    setElectionId(election_id) {
        this.election_id = election_id;
    }

    getAdminId() {
        return this.admin_id;
    }
    setAdminId(admin_id) {
        this.admin_id = admin_id;
    }

    static async IsMobileExist(mobile) {
        const query = util.promisify(connection.query).bind(connection);
        const emailExist = await query("select * from candidates where mobile = ?", [mobile]);
        if(emailExist.length > 0){
            return true;
        }
        return false;
    }

    static async IsEmailExist(email) {
        const query = util.promisify(connection.query).bind(connection);
        const emailExist = await query("select * from candidates where email = ?", [email]);
        if(emailExist.length > 0){
            return true;
        }
        return false;
    }

    static async checkEmail(email, candidate_id) {
        const query = util.promisify(connection.query).bind(connection);
        const candidate = await query("select email from candidates where id = ? ", [candidate_id]);
        console.log(candidate[0].email)
        console.log(email)
        if(candidate[0].email == email || !await this.IsEmailExist(email)){
            return true;
        }
        return false;
    }

    static async IsExist(id) {
        const query = util.promisify(connection.query).bind(connection);
        const candidate = await query("select * from candidates where id = ? ", [id]);
        if (candidate[0]) {
            return true;
        }
        return false;
    }

    static async IsNominated(election_id, candidate_id) {
        const query = util.promisify(connection.query).bind(connection);
        const candidate = await query("select election_id from candidates where id = ? ", candidate_id);
        if (candidate[0].election_id == election_id) {
            return true;
        }
        return false;
    }

    static async Add(candidate) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            await query("insert into candidates set ? ", candidate);
        } catch (error) {
            console.log(error);
        }
    }

    static async Update(editedCandidate, id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            await query("update candidates set ? where id = ? ", [editedCandidate, id]);
        } catch (error) {
            console.log(error);
        }
    }

    static async Delete(id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            await query("delete from candidates where id = ? ", [id]);
        } catch (error) {
            console.log(error);
        }
    }

    static async getCandidates(search) {
        try {
            if (search) {
                search = `where name LIKE '%${search}%'`
            }
            const query = util.promisify(connection.query).bind(connection);
            const candidates = await query(`select * from candidates ${search}`);
            candidates.map((candidate) => {
                candidate.photo = "http://localhost" + ":5000/" + candidate.photo;
            });
            return candidates;
        } catch (error) {
            console.log(error);
        }
    }

    static async getCandidate(id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            const candidate = await query("select * from candidates where id = ? ", [id]);
            candidate[0].photo = "http://localhost" + ":5000/" + candidate[0].photo;
            return candidate[0];
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteUploadedPhoto(candidate_id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            const candidate = await query("select photo from candidates where id = ? ", [candidate_id]);
            fs.unlinkSync("./uploads/" + candidate[0].photo);
        } catch (error) {
            console.log(error);
        }
    }

    static async UpdateNumOfVotes(votes, candidate_id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            await query(`update candidates set num_of_votes = ${votes} where ID = ${candidate_id}`);
        } catch (error) {
            console.log(error);
        }
    }

    static async electionCandidates(election_id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            const candidates = await query(`select * from votingsystem.candidates where election_id = ${election_id};`);
            return candidates;
        } catch (error) {
            console.log(error);
        }
    }

    static async Winner(election_id) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            const candidates = await query(`select candidates.name, candidates.num_of_votes FROM candidates
            LEFT JOIN elections
            ON candidates.election_id = elections.ID 
            WHERE candidates.num_of_votes = ( 
                SELECT MAX( candidates.num_of_votes) 
                from candidates 
                where candidates.election_id = ${election_id}
                );`
            );
            return candidates;
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = {Candidate:Candidate};