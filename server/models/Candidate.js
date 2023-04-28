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
};

module.exports = {Candidate:Candidate};