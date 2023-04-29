const connection = require('../db/connection');
const util = require("util");
const bcrypt = require("bcrypt");

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

    static async IsIdProofExist(id_proof){
        const query = util.promisify(connection.query).bind(connection);
        const idProofExist = await query("select * from users where id_proof = ?", [id_proof]);
        if(idProofExist.length > 0){
            return true;
        }
        return false;
    }

    static async IsEmailExist(email) {
        const query = util.promisify(connection.query).bind(connection);
        const emailExist = await query("select * from users where email = ?", [email]);
        if(emailExist.length > 0){
            return true;
        }
        return false;
    }

    static async CheckPassword(email, password) {
        const query = util.promisify(connection.query).bind(connection);
        const user = await query("select password from users where email = ?", [email]);
        const checkPassword = await bcrypt.compare(password, user[0].password);
        if(checkPassword){
            return true;
        }
        return false;
    }

    static async IsVoted(id) {
        const query = util.promisify(connection.query).bind(connection);
        const user = await query("select voted from users where id = ? ", [id]);
        if (user[0].voted) {
            return true;
        }
        return false;
    }
};

module.exports = {User:User};