var idCount = 0;
var workoutCount = 0;
var moodInputNum = 0;
var workouts = [];
var workoutLayout = [];
var i = 0;
var x = 0;

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

    workoutLayout.length = 0;
    moodInputNum = 0;
    idCount = 0;
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
    console.log(workoutLayout)
    
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
    if(workoutCount === 0) {
        document.getElementById('add-first-workout').style.display = 'none';
    }
    workoutCount++;
    var packMand = {
        date:document.getElementById('workout-date').value,
        time:document.getElementById('time-input').value,
        timeUnit:document.getElementById('time-unit').value,
        distance:document.getElementById('distance-input').value,
        distanceUnit:document.getElementById('distance-unit').value,
        intensity:document.getElementById('intensity-range').value,
        workoutType:document.getElementById('workout-type').value,
    }
    var packOpt = {
        highlights:document.getElementById('highlights-input').value,
        mood:moodInputNum,
        goals:document.getElementById('goals-dropdown').value,
    }
    for(var i in packMand) {
        if(!packMand[i]) {
            console.log(false);
            return;
        }
    }
    console.log(packMand);

    var workoutID = `workoutNum${i}`

    workouts[i] = {
        num:i,
        packMand:packMand,
        packOpt:packOpt,
    }
    i++;

    var workoutSymbol = assignWorkoutSymbol(packMand);

    var newWorkout = document.createElement('div');
    newWorkout.className = 'added-workout';
    newWorkout.id = workoutID;
    newWorkout.onclick = showFullWorkout(workoutID);
    newWorkout.innerHTML = 
            `<div class="aw-workout-type"> ${workoutSymbol} </div>
            <div class="aw-title">
                <h4> ${packMand.date} </h4>
                <h5> ${packMand.time} ${packMand.timeUnit} </h5>
                <h5> ${packMand.distance} ${packMand.distanceUnit} </h5>
            </div>
            <div class="aw-inten-mood"> 
                <h5> Intensity: ${packMand.intensity}/10 </h5>
                <h5> &#128522 </h5>
            </div>`;
    var workoutSection = document.getElementById('added-workout-section');
    console.log(workoutSection);
    workoutSection.appendChild(newWorkout);
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

function showFullWorkout() {
    
}