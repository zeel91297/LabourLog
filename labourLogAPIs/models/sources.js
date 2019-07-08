var db = require('../dbconnection');

var Sources = {
    getAllSources: function (callback) {
        return db.query("select * from sources", callback);
    },
    getSourcesById: function (id, callback) {
        return db.query("SELECT * FROM `sources` WHERE `source_id`=?", [id], callback);
    },
    addSources: function (Sources, callback) {
        return db.query("INSERT INTO `Sources` (`source_id`, `source_name`, `source_desc`, `source_contact`, `source_email`) VALUES (?, ?, ?, ?, ?);",
            [null, Sources.source_name, Sources.source_desc, Sources.source_contact, Sources.source_email],callback);
    },
    deleteSourcesById: function(id , callback){
       return db.query("DELETE FROM `sources` WHERE source_id=?",[id], callback);
    },
    WorkforcecountBySourcebyID: function(id , callback){
        return db.query("SELECT COUNT(*) FROM workforces WHERE source_id=?",[id], callback);
    },
    updatesource: function(id,Sources,callback){
        return db.query("UPDATE `sources` SET `source_name`=?,`source_desc`=?,`source_contact`=?,`source_email`=? WHERE source_id=?",[Sources.source_name,Sources.source_desc,Sources.source_contact,Sources.source_email,id],callback);
    }
};

module.exports = Sources;