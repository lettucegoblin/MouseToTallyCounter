let app = document.getElementById('app')
let timer = document.getElementById('timer')
let count = 0;
let lastReset = Date.now()
let showTimer = false;

document.addEventListener('pointerlockchange', function() {
  if (document.pointerLockElement === app) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("pointerup", upEvent, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("pointerup", upEvent, false);
    
  }
}, false);

function upEvent(e){
    console.log('Pointer up', e);
    count += 1;
    if(e.button == 1){
        count = 0
        lastReset = Date.now();
        showTimer = true;
        timer.classList.remove('hide')
    } else{
        timer.classList.add('hide')
        showTimer = false
    }
}

app.onclick = function() {
    app.requestPointerLock();
}
function handleTickInit(tick) {
    Tick.helper.interval(function () {

        tick.value = count
        if(showTimer){
            let t = (Date.now() - lastReset) / 1000;
            timer.innerText = Math.floor(t) + "s"
        }
        
    }, 100);
}