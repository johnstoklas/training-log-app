require('./Database');

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/public'));

serv.listen(process.env.PORT || 2000);
console.log('Server started.');

var io = require('socket.io') (serv, {});
io.sockets.on('connection', function(socket) {
    socket.id = Math.random();
    //SOCKET_LIST[socket.id] = socket;

    socket.on('signIn', function(data) {
        Database.isValidPassword(data, function(res) {
            if (!res) {
                return socket.emit('signInResponse',false);
            }
            Database.getUserWorkouts(data.username, function(workoutPack) {
                if(!workoutPack) {
                    socket.emit('signInResponse', true);
                    return;
                }
                socket.emit('sendWorkoutPack', workoutPack);
                socket.emit('signInResponse', true);
            });
        });
        
    });

    socket.on('signUp', function(data) {
        Database.isUsernameTaken(data, function(res) {
            if(res) {
                socket.emit('signUpResponse', false);
            }
            else {
                Database.addUser(data, function() {
                    socket.emit('signUpResponse', true);
                });
            }
        });
    });

    socket.on('updateWorkoutPack', function(updatePack) {
        for(var i in updatePack.workouts) {
            console.log('data sent to server ' + updatePack.workouts[i])
        }
        Database.updateUserWorkouts(updatePack);
    })
});