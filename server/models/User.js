class User {

    constructor (id, name, id_proof, email, password, voted, token, role) {
        this.ID = id;
        this.name = name;
        this.id_proof = id_proof;
        this.email = email;
        this.password = password;
        this.voted = voted;
        this.token = token;
        this.role = role;
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

    getIdProof() {
        return this.id_proof;
    }
    setIdProof(id_proof) {
        this.id_proof = id_proof;
    }

    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }

    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }

    getVoted() {
        return this.voted;
    }
    setVoted(voted) {
        this.voted = voted;
    }

    getToken() {
        return this.token;
    }
    setToken(token) {
        this.token = token;
    }

    getRole() {
        return this.role;
    }
    setRole(role) {
        this.role = role;
    }
};

module.exports = {User:User};