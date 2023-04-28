class Election {

    constructor (name, start_date, end_date, is_active) {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.is_active = is_active;
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

    getis_active() {
        return this.is_active;
    }
    setis_active(is_active) {
        this.is_active = is_active;
    }
};

module.exports = {Election:Election};