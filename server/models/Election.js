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
};

module.exports = {Election:Election};