var idCount = 0;
var workoutCount = 0;

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
            <div class="awb-delete" onclick="removeWorkoutBlock(${blockID})"> &#10005; </div>
        </div>
        <textarea class="input-workout-block" id="warm-up-input"></textarea>`
    }
    else if(type === 'preSet') {
        workoutBlock.style = 'background-color:#45ed75';
        workoutBlock.innerHTML = 
        `<div>
            <h4 class="awb-title" > Pre Set </h4>
            <div class="awb-delete" onclick="removeWorkoutBlock(${blockID})"> &#10005; </div>
        </div>
        <textarea class="input-workout-block" id="pre-set-input"></textarea>`
    }
    else if(type === 'mainSet') {
        workoutBlock.style = 'background-color:#a520e3';
        workoutBlock.innerHTML = 
        `<div>
            <h4 class="awb-title" > Main Set </h4>
            <div class="awb-delete" onclick="removeWorkoutBlock(${blockID})"> &#10005; </div>
        </div>
        <textarea class="input-workout-block" id="warm-up-input"></textarea>`
    }
    else if(type === 'postSet') {
        workoutBlock.style = 'background-color:#e32081';
        workoutBlock.innerHTML = 
        `<div>
            <h4 class="awb-title" > Post Set </h4>
            <div class="awb-delete" onclick="removeWorkoutBlock(${blockID})"> &#10005; </div>
        </div>
        <textarea class="input-workout-block" id="warm-up-input"></textarea>`
    }
    else if(type === 'warmDown') {
        workoutBlock.style = 'background-color:#e38220';
        workoutBlock.innerHTML = 
        `<div>
            <h4 class="awb-title" > Warm Down </h4>
            <div class="awb-delete" onclick="removeWorkoutBlock(${blockID})"> &#10005; </div>
        </div>
        <textarea class="input-workout-block" id="warm-up-input"></textarea>`
    }
    
    workoutBuilder.appendChild(workoutBlock);

}

function removeWorkoutBlock(blockID) {
    blockID.remove();
}


function createWorkout() { 
    if(workoutCount === 0) {
        document.getElementById('add-first-workout').style.display = 'none';
    }
    workoutCount++;
    var pack = {
        date:document.getElementById('workout-date').value,
        time:document.getElementById('time-input').value,
        timeUnit:document.getElementById('time-unit').value,
        distance:document.getElementById('distance-input').value,
        distanceUnit:document.getElementById('distance-unit').value,
        intensity:document.getElementById('intensity-range').value,
        workoutType:document.getElementById('workout-type').value,
    }
    for(var i in pack) {
        if(!pack[i]) {
            console.log(false);
            return;
        }
    }
    console.log(pack);

    var newWorkout = document.createElement('div');
    newWorkout.className = 'added-workout';
    newWorkout.innerHTML = 
            `<div class="aw-workout-type"> 🏃 </div>
            <div class="aw-title">
                <h4> ${pack.date} </h4>
                <h5> ${pack.time} ${pack.timeUnit} </h5>
                <h5> ${pack.distance} ${pack.distanceUnit} </h5>
            </div>
            <div class="aw-inten-mood"> 
                <h5> Intensity: ${pack.intensity}/10 </h5>
                <h5> &#128522 </h5>
            </div>`;
    var workoutSection = document.getElementById('added-workout-section');
    console.log(workoutSection);
    workoutSection.appendChild(newWorkout);
    document.getElementById('add-workout').style.display = 'none';
    clearAddWorkout();
}