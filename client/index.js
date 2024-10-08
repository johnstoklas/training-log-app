var socket = io(); 

var idCount = 0;
var workoutCount = 0;
var moodInputNum = 0;
var workouts = [];
var workoutLayout = [];
var blockValues = [];
var x = 0;

var usernameClient = ''; 

function addWorkoutButton() {
    document.getElementById('add-workout').style.display = 'block';
}

function closeAddWorkout() {
    document.getElementById('add-workout').style.display = 'none';
    clearAddWorkout();
}

function clearAddWorkout() {
    document.getElementById('time-input').value = '';
    document.getElementById('time-unit').value = '';
    document.getElementById('distance-input').value = '';
    document.getElementById('distance-unit').value = '';
    document.getElementById('intensity-range').value = 1;
    document.getElementById('workout-type').value = '';
    document.getElementById('workout-layout').innerHTML = ``;
    document.getElementById('workout-date').value = '';

    workoutLayout.length = 0;
    moodInputNum = 0;
    moodInput(moodInputNum);
    idCount = 0;
    document.getElementById('required-fields').style.display = 'none';
}

function addWorkoutBlock(type) {
    idCount++;
    blockID = `wb${idCount}`;
    inputBlockID = `wb-input-${idCount}`
    var workoutBlock = document.createElement('div');
    workoutBlock.className = 'added-workout-block';
    workoutBlock.id = blockID;
    workoutBlock.style = 'background-color:#45a2ed';
    var workoutBuilder = document.getElementById('workout-layout');
    if(type === 'warmUp') {
        workoutBlock.style = 'background-color:#45a2ed';
        workoutBlock.innerHTML = 
        `<div>
            <h4 class="awb-title" > Warm Up </h4>
            <div class="awb-delete" onclick="removeWorkoutBlock(${blockID}, ${x})"> &#10005; </div>
        </div>
        <textarea class="input-workout-block" id="warm-up-input"></textarea>`
        workoutLayout[x] = {
            type:type,
            id:blockID,
        }
    }
    else if(type === 'preSet') {
        workoutBlock.style = 'background-color:#45ed75';
        workoutBlock.innerHTML = 
        `<div>
            <h4 class="awb-title" > Pre Set </h4>
            <div class="awb-delete" onclick="removeWorkoutBlock(${blockID}, ${x})"> &#10005; </div>
        </div>
        <textarea class="input-workout-block" id="pre-set-input"></textarea>`
        workoutLayout[x] = {
            type:type,
            id:blockID,
        }
    }
    else if(type === 'mainSet') {
        workoutBlock.style = 'background-color:#a520e3';
        workoutBlock.innerHTML = 
        `<div>
            <h4 class="awb-title" > Main Set </h4>
            <div class="awb-delete" onclick="removeWorkoutBlock(${blockID}, ${x})"> &#10005; </div>
        </div>
        <textarea class="input-workout-block" id="warm-up-input"></textarea>`
        workoutLayout[x] = {
            type:type,
            id:blockID,
        }
    }
    else if(type === 'postSet') {
        workoutBlock.style = 'background-color:#e32081';
        workoutBlock.innerHTML = 
        `<div>
            <h4 class="awb-title" > Post Set </h4>
            <div class="awb-delete" onclick="removeWorkoutBlock(${blockID}, ${x})"> &#10005; </div>
        </div>
        <textarea class="input-workout-block" id="warm-up-input"></textarea>`
        workoutLayout[x] = {
            type:type,
            id:blockID,
        }
    }
    else if(type === 'warmDown') {
        workoutBlock.style = 'background-color:#e38220';
        workoutBlock.innerHTML = 
        `<div>
            <h4 class="awb-title" > Warm Down </h4>
            <div class="awb-delete" onclick="removeWorkoutBlock(${blockID}, ${x})"> &#10005; </div>
        </div>
        <textarea class="input-workout-block" id="warm-up-input"></textarea>`
        workoutLayout[x] = {
            type:type,
            id:blockID,
        }
    }
    x++;
    
    workoutBuilder.appendChild(workoutBlock);

}

function removeWorkoutBlock(blockID,pos) {
    blockID.remove();
    workoutLayout[pos] = null;
}

function moodInput(scaleNum) {
    document.getElementById('mood1').style.border = 'none';
    document.getElementById('mood2').style.border = 'none';
    document.getElementById('mood3').style.border = 'none';
    document.getElementById('mood4').style.border = 'none';
    document.getElementById('mood5').style.border = 'none';

    if(scaleNum === 0) {
        return;
    }

    if(scaleNum === 1) {
        document.getElementById('mood1').style.border = '1px solid white';
        moodInputNum = 1;
    }
    else if(scaleNum === 2) {
        document.getElementById('mood2').style.border = '1px solid white';
        moodInputNum = 2;
    }
    else if(scaleNum === 3) {
        document.getElementById('mood3').style.border = '1px solid white';
        moodInputNum = 3;
    }
    else if(scaleNum === 4) {
        document.getElementById('mood4').style.border = '1px solid white';
        moodInputNum = 4;
    }
    else if(scaleNum === 5) {
        document.getElementById('mood5').style.border = '1px solid white';
        moodInputNum = 5;
    }
}


function createWorkout() { 
    var packMand = {
        date:document.getElementById('workout-date').value,
        time:document.getElementById('time-input').value,
        timeUnit:document.getElementById('time-unit').value,
        distance:document.getElementById('distance-input').value,
        distanceUnit:document.getElementById('distance-unit').value,
        intensity:document.getElementById('intensity-range').value,
        workoutType:document.getElementById('workout-type').value,
        mood:moodInputNum,
    }
    
    var newWorkoutLayout = removeNullBlocks(workoutLayout);
    
    for(var a in packMand) {
        if(!packMand[a]) {
            document.getElementById('required-fields').style.display = 'inline-block';
            return;
        }
    }
    if(packMand.time <= 0 || packMand.distance <= 0 || packMand.time.startsWith('0') || packMand.distance.startsWith('0')) {
        document.getElementById('required-fields').style.display = 'inline-block';
        return;
    } 

    var workoutID = `workoutNum${workoutCount}`

    var workoutSymbol = assignWorkoutSymbol(packMand);
    var workoutMood = assignWorkoutMood(packMand.mood);

    var newWorkout = document.createElement('div');
    newWorkout.className = 'added-workout';

    newWorkout.innerHTML = 
            `<div class="aw-workout-type"> ${workoutSymbol} </div>
            <div class="aw-title">
                <h4> ${packMand.date} </h4>
                <h5> ${packMand.time} ${packMand.timeUnit} </h5>
                <h5> ${packMand.distance} ${packMand.distanceUnit} </h5>
            </div>
            <div class="aw-inten-mood"> 
                <h5> Intensity: ${packMand.intensity}/10 </h5>
                <h5> ${workoutMood} </h5>
            </div>
            <div onclick="showFullWorkout(${workoutID})" class="aw-show-more"> Show More </div>`;
    var smallWorkoutDiv = document.getElementById('aw-small');
    smallWorkoutDiv.appendChild(newWorkout);
    var newWorkoutFull = document.createElement('div');
    newWorkoutFull.className = 'full-workout';
    newWorkoutFull.id = workoutID;
    newWorkoutFull.innerHTML = 
        `
            <div class="fw-heading">
                <div class="fw-type"> ${workoutSymbol} </div>
                <div class="fw-title">
                    <h4> ${packMand.date} </h4>
                    <h5> ${packMand.time} ${packMand.timeUnit} </h5>
                    <h5> ${packMand.distance} ${packMand.distanceUnit} </h5>
                </div>
                <div class="fw-inten-mood"> 
                    <h5> Intensity: ${packMand.intensity}/10</h5>
                    <h5> ${workoutMood} </h5>
                </div>  
                <div onclick="closeFullWorkout(${workoutID})" class="fw-close"> &#10005; </div>
            </div>
            <div class="fw-layout"></div>
        `;
    var workoutSection = document.getElementById('aw-full');
    workoutSection.appendChild(newWorkoutFull);
    var workoutLayoutInput = getLayoutInput(newWorkoutLayout);
    //console.log('when function is ran: ' + workoutLayoutInput)

    createWorkoutLayout(newWorkoutLayout, workoutLayoutInput);

    console.log(workoutCount)

    workouts[workoutCount] = {
        packMand:packMand,
        workoutBlockLayout:newWorkoutLayout,
        workoutBlockValues:workoutLayoutInput,
    }

    var updatePack = {
        username:usernameClient,
        workoutArray:workouts,
    }

    console.log('data sent from client to server ' + updatePack.workoutArray[0].packMand)
    console.log('data sent from client to server ' + updatePack.workoutArray[0].workoutBlockLayout)
    console.log('data sent from client to server ' + updatePack.workoutArray[0].workoutBlockValues)


    socket.emit('updateWorkoutPack', updatePack);
    workoutCount++;
    if(workoutCount > 0) {
        document.getElementById('add-first-workout').style.display = 'none';
    }

    document.getElementById('add-workout').style.display = 'none';
    clearAddWorkout();
}

function assignWorkoutSymbol(pack) {
    if(pack.workoutType === 'run') {
        return '🏃';
    }
    else if(pack.workoutType === 'bike') {
        return '🚴';
    }
    else if(pack.workoutType === 'swim') {
        return '🏊';
    }
    else if(pack.workoutType === 'other') {
        return '💪';
    }
}

function assignWorkoutMood(num) {
    if(num === 0) {
        return '';
    }
    else if(num === 1) {
        return '&#128564';
    }
    else if(num === 2) {
        return '&#128549';
    }
    else if(num === 3) {
        return '&#128528';
    }
    else if(num === 4) {
        return '&#128522';
    }
    else if(num === 5) {
        return '&#128513';
    }
}

function showFullWorkout(id) {
    id.style.display = 'block';
}

function closeFullWorkout(id) {
    id.style.display = 'none';
}

function removeNullBlocks(array) {
    var ret = [];
    var count = 0;
    for(var a = 0; a<array.length; a++) {
        if(array[a]) {
            ret[count] = array[a];
            count++;
        } 
    }
    return ret;
}

function getLayoutInput(array) {
    var ret = [];
    for(var a = 0; a<array.length; a++) {
        ret[a] = document.getElementById(array[a].id).lastElementChild.value;
    }
    //console.log('ret value in function: ' + ret);
    return ret;
}

function createWorkoutLayout(array, inputArray) {
    var appendDiv = document.getElementById('aw-full').lastElementChild.lastElementChild;
    
    for(var a = 0; a<array.length; a++) {
        var newDiv = document.createElement('div');
        newDiv.className = 'fw-workout-block';
        if(array[a].type === 'warmUp') {
            newDiv.style = 'background-color:#45a2ed';
            newDiv.innerHTML = 
            `<div>
                <h4 class="awb-title" > Warm Up </h4>
            </div>
            <pre> ${inputArray[a]} </pre>`
        }
        else if(array[a].type === 'preSet') {
            newDiv.style = 'background-color:#45ed75';
            newDiv.innerHTML = 
            `<div>
                <h4 class="awb-title" > Pre Set </h4>
            </div>
            <pre> ${inputArray[a]}  </pre>`
        }
        else if(array[a].type === 'mainSet') {
            newDiv.style = 'background-color:#a520e3';
            newDiv.innerHTML = 
            `<div>
                <h4 class="awb-title" > Main Set </h4>
            </div>
            <pre> ${inputArray[a]}  </pre>`
        }
        else if(array[a].type === 'postSet') {
            newDiv.style = 'background-color:#e32081';
            newDiv.innerHTML = 
            `<div>
                <h4 class="awb-title" > Post Set </h4>
            </div>
            <pre> ${inputArray[a]} </pre>`
        }
        else if(array[a].type === 'warmDown') {
            newDiv.style = 'background-color:#e38220';
            newDiv.innerHTML = 
            `<div>
                <h4 class="awb-title" > Warm Down </h4>
            </div>
            <pre> ${inputArray[a]} </pre>`
        }
        appendDiv.appendChild(newDiv);
    }
}

function signIn(username, password) {
    var data = {
        username:username,
        password:password,
    }
    usernameClient = username;
    socket.emit('signIn', data);
}

socket.on('signInResponse', function(output) {
    if(output) {
        document.getElementById('log-in-div').style.display = 'none';
        document.getElementById('invalid-signUp').style.display = 'none';
        document.getElementById('invalid-signIn').style.display = 'none';
        document.getElementById('valid-signUp').style.display = 'none';
        document.getElementById('log-out').style.display = 'block';
        document.getElementById('addWorkoutButton').style.display = 'block';
    }
    else {
        document.getElementById('invalid-signUp').style.display = 'none';
        document.getElementById('valid-signUp').style.display = 'none';
        document.getElementById('invalid-signIn').style.display = 'block';
    }
})

function signUp(username, password) {
    var data = {
        username:username,
        password:password,
    }
    socket.emit('signUp', data);
}

socket.on('signUpResponse', function(output) {
    if(output) {
        document.getElementById('invalid-signUp').style.display = 'none';
        document.getElementById('invalid-signIn').style.display = 'none';
        document.getElementById('valid-signUp').style.display = 'block';
    }
    else {
        document.getElementById('valid-signUp').style.display = 'none';
        document.getElementById('invalid-signIn').style.display = 'none';
        document.getElementById('invalid-signUp').style.display = 'block';
    }
})

socket.on('sendWorkoutPack', function(workoutPack) {
    loadWorkouts(workoutPack);
});

function loadWorkouts(workoutPack) {
    if(workoutPack.workoutArray) {
        if(workoutPack.workoutArray.length > 0) {
            workoutCount = workoutPack.workoutArray.length;
        }
        if(workoutPack.workoutArray.length > 0) {
            document.getElementById('add-first-workout').style.display = 'none';
        }
        for(var i = 0; i < workoutPack.workoutArray.length; i++) {
            console.log('data received '  + workoutPack.workoutArray[i])
            workouts[i] = {
                packMand:workoutPack.workoutArray[i].packMand,
                workoutBlockLayout:workoutPack.workoutArray[i].workoutBlockLayout,
                workoutBlockValues:workoutPack.workoutArray[i].workoutBlockValues,
            }
        }
        for(var i = 0; i < workoutPack.workoutArray.length; i++) {
            loadWorkoutBlocks(workoutPack.workoutArray[i].packMand, workoutPack.workoutArray[i].workoutBlockLayout, workoutPack.workoutArray[i].workoutBlockValues, i);
        }
    }
}

function loadWorkoutBlocks(packMand, blockLayout, workoutBlockValues, pos) {
    var workoutID = `workoutNum${pos}`

    var workoutSymbol = assignWorkoutSymbol(packMand);
    var workoutMood = assignWorkoutMood(packMand.mood);

    var newWorkout = document.createElement('div');
    newWorkout.className = 'added-workout';

    newWorkout.innerHTML = 
            `<div class="aw-workout-type"> ${workoutSymbol} </div>
            <div class="aw-title">
                <h4> ${packMand.date} </h4>
                <h5> ${packMand.time} ${packMand.timeUnit} </h5>
                <h5> ${packMand.distance} ${packMand.distanceUnit} </h5>
            </div>
            <div class="aw-inten-mood"> 
                <h5> Intensity: ${packMand.intensity}/10 </h5>
                <h5> ${workoutMood} </h5>
            </div>
            <div onclick="showFullWorkout(${workoutID})" class="aw-show-more"> Show More </div>`;
    var smallWorkoutDiv = document.getElementById('aw-small');
    smallWorkoutDiv.appendChild(newWorkout);
    var newWorkoutFull = document.createElement('div');
    newWorkoutFull.className = 'full-workout';
    newWorkoutFull.id = workoutID;
    newWorkoutFull.innerHTML = 
        `
            <div class="fw-heading">
                <div class="fw-type"> ${workoutSymbol} </div>
                <div class="fw-title">
                    <h4> ${packMand.date} </h4>
                    <h5> ${packMand.time} ${packMand.timeUnit} </h5>
                    <h5> ${packMand.distance} ${packMand.distanceUnit} </h5>
                </div>
                <div class="fw-inten-mood"> 
                    <h5> Intensity: ${packMand.intensity}/10</h5>
                    <h5> ${workoutMood} </h5>
                </div>  
                <div onclick="closeFullWorkout(${workoutID})" class="fw-close"> &#10005; </div>
            </div>
            <div class="fw-layout"></div>
        `;
        
    var workoutSection = document.getElementById('aw-full');
    workoutSection.appendChild(newWorkoutFull);
    if(blockLayout) {
        createWorkoutLayout(blockLayout, workoutBlockValues);
    }
}

function logOut() {
    document.getElementById('aw-small').innerHTML = ``;
    document.getElementById('aw-full').innerHTML = ``;
    document.getElementById('log-in-div').style.display = 'block';
    document.getElementById('invalid-signIn').style.display = 'none';
    document.getElementById('invalid-signUp').style.display = 'none';
    document.getElementById('valid-signUp').style.display = 'none';
    document.getElementById('add-first-workout').style.display = 'block';
    document.getElementById('log-out').style.display = 'none';
    document.getElementById('addWorkoutButton').style.display = 'none';
    clearAddWorkout();
}