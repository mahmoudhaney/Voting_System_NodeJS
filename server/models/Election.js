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
};

module.exports = {Election:Election};