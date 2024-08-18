var mongojs = require("mongojs");
var db = mongojs('localhost:27017/trainingLog', ['account','workouts']);

Database = {};

Database.isValidPassword = function(data, cb) {
    db.account.find({username:data.username,password:data.password}, function(err,res) {
        if(res.length > 0) 
            cb(true);
        else
            cb(false);
    });
}

Database.isUsernameTaken = function(data, cb) {
    db.account.findOne({username:data.username}, function(err,res) {
        if(res) 
            cb(true);
        else
            cb(false);
    });
}

Database.addUser = function(data, cb) {
    db.account.insert({username:data.username,password:data.password}, function(err) {
        Database.updateUserWorkouts({username:data.username,workouts:[]}, function(){
            cb();
        });
    });
}

Database.getUserWorkouts = function(username, cb) {
    db.workouts.findOne({username:username}, function(err, res) {
        cb(res)
    })
}

Database.updateUserWorkouts = function(data, cb) {
    db.workouts.update({username:data.username},{$set:{workoutArray:data.workoutArray}},{upsert:true}, cb); 
}