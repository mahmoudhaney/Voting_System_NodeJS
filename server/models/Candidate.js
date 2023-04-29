const connection = require('../db/connection');
const util = require("util");

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

    getNumOfVotes() {
        return this.num_of_votes;
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
};

module.exports = {Candidate:Candidate};