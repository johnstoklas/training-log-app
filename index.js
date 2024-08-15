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
    
    for(var i in packMand) {
        if(!packMand[i]) {
            document.getElementById('required-fields').style.display = 'inline-block';
            return;
        }
    }

    var workoutID = `workoutNum${i}`

    workouts[i] = {
        num:i,
        packMand:packMand,
    }
    i++;

    if(workoutCount === 0) {
        document.getElementById('add-first-workout').style.display = 'none';
    }
    workoutCount++;

    var workoutSymbol = assignWorkoutSymbol(packMand);
    var workoutMood = assignWorkoutMood(packMand.mood);

    var newWorkout = document.createElement('div');
    newWorkout.className = 'added-workout';
    //newWorkout.id = workoutID;
    //newWorkout.onclick = 
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
                <div onclick="closeFullWorkou(${workoutID})" class="fw-close"> &#10005; </div>
            </div>
            <div class="fw-layout"></div>
        `;
    var workoutSection = document.getElementById('added-workout-section');
    workoutSection.appendChild(newWorkout);
    workoutSection.appendChild(newWorkoutFull);
    var workoutLayoutInput = getLayoutInput(newWorkoutLayout);
    createWorkoutLayout(newWorkoutLayout, workoutLayoutInput);
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
    console.log(id)
    console.log(document.getElementById(id))
    id.style.display = 'block';
}

function closeFullWorkou(id) {
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
    for(var a = 0; a<array.length; a++) {ret[a] = document.getElementById(array[a].id).lastElementChild.value;}
    return ret;
}

function createWorkoutLayout(array, inputArray) {
    var appendDiv = document.getElementById('added-workout-section').lastElementChild.lastElementChild
    console.log(appendDiv)
    
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
