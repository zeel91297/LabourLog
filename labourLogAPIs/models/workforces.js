var db = require('../dbconnection');

var Workforces = {
    getAllWorkForces: function (callback) {
        return db.query("select * from workforces", callback);
    },
    getWorkforceById: function (id, callback) {
        //console.log(id);
        return db.query("SELECT * FROM `workforces` WHERE `workforce_id`=?", [id], callback);
    },
    addWorkforce: function (WorkForce, callback) {
        return db.query("INSERT INTO `workforces` (`workforce_id`, `workforce_name`, `workforce_rate`, `job_role_id`, `workforce_contact`, `source_id`, `workforce_bill_rate`, `workforce_pic`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
            [null, WorkForce.workforce_name, WorkForce.workforce_rate, WorkForce.job_role_id, WorkForce.workforce_contact, WorkForce.source_id, WorkForce.workforce_bill_rate, null]);
    }
};

module.exports = Workforces;