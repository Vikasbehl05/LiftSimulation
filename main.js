var floor = document.getElementById("floorInput");
var lift = document.getElementById("liftInput");
var submitButton = document.getElementById("submit");
var layer = document.getElementById("layer");

validateFloor = () => {
  if (floor.value >= 1 && floor.value <= 6) return true;
  else return false;
};

validateLift = () => {
  if (lift.value >= 1 || lift.value <= 4) return true;
  else return false;
};

submitButton.addEventListener("click", () => {
  if (validateFloor() && validateLift()) {
    let addedFloors = "";
    for (var i = floor.value - 1; i >= 0; i--) {
      addedFloors += `<div class="floor-container" id="lt" data-floorContainer="${i}">
    <div class="floor">
      <div class="ground-floor-container">
        <div class="button-container">
          <button class="move btn-move" id="up" data-floor="${i}">Up</button>
          <button class="move btn-move" id="down" data-floor="${i}">Down</button>
        </div>
        ${i == 0 ? addLift(lift.value) : ""}
      </div>
      </div>  
     <p class ="floornum">Floor:${i}</p>
  </div>
  `;
      console.log(i);
    }

    layer.innerHTML = addedFloors;
    return;
  } else {
    return alert(
      "enter the value of floor between the range 1 to 6 and value of lift between the range 1 to 4 "
    );
  }
});

function addLift(numberOfLifts) {
  let addedLifts = ``;
  for (let i = 0; i < numberOfLifts; i++) {
    addedLifts += `<div class="lift " id="lift" data-liftposition="${i}" >
    <div class="left-door"></div>
    <div class="right-door"></div>
      </div>`;
  }
  return addedLifts;
}

var floorStatus = 0;

let currentFloor = 0;

addEventListener("click", (e) => {
  if (e.target.classList.contains("move")) {
    if (e.target.dataset.floor == currentFloor) {
      return;
    } else {
      liftStatus(e.target.dataset.floor);
    }
    currentFloor = e.target.dataset.floor;
  }
});

function liftStatus(targetFloor) {
  const lifts = Array.from(document.getElementsByClassName("lift"));
  for (const lift of lifts) {
    if (!lift.classList.contains("busy")) {
      startLift(targetFloor, lift);
      return;
    }
  }
}

function startLift(targetFloor, freeLift) {
  const currentPosition = freeLift.dataset.liftposition;
  const time = Math.abs(targetFloor - currentPosition);
  freeLift.style.transition = `transform ${time * 2}s linear`;
  freeLift.style.transform = `translateY(${-102 * targetFloor}px)`;
  freeLift.classList.add("busy");
  freeLift.dataset.liftposition = targetFloor;
  setTimeout(() => {
    freeLift.children[0].classList.add("move-left");
    freeLift.children[1].classList.add("move-right");
  }, time * 2000 + 1000);
  setTimeout(() => {
    freeLift.children[0].classList.remove("move-left");
    freeLift.children[1].classList.remove("move-right");
  }, time * 2000 + 2000);

  setTimeout(() => {
    freeLift.classList.remove("busy");
  }, time * 2000 + 2500);
}
