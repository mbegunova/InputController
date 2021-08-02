let activityList = {
  "left": { // название активности
    keys: [37, 65], // список кодов кнопок соответствующих активности
    enabled: false // отключенная активность
  },
  "right": {
    keys: [39, 68],
    enabled: false // отключенная активность
  },
  "up": {
    keys: [38, 87],
    enabled: false // отключенная активность
  },
  "down": {
    keys: [40, 83],
    enabled: false // отключенная активность
  },
}


let target = document.getElementById('div-window');
let controller = new InputController(activityList, target);

let attach = document.getElementById('attach');
attach.onclick = function () {
  controller.attach(target, false);
};
let detach = document.getElementById('detach');
detach.onclick = function () {
  controller.detach();
};
let extraBind = document.getElementById('extra-bind');
extraBind.onclick = function () {
  //TODO Добавить активность
};

document.addEventListener('keydown', function (e) {
  controller.enableActivation(getActionName(e.target));
}, false);

let activation = document.getElementById('activation');
activation.onclick = function () {
  document.addEventListener('keydown', move(), false);
};
let deactivation = document.getElementById('deactivation');
deactivation.onclick = function () {
  target.addEventListener('keyup', move(), false);
};

document.addEventListener(controller.ACTION_ACTIVATED, function () {

}, false);


document.addEventListener(controller.ACTION_DEACTIVATED, function () {

}, false);


function move() {
  for (let i = 0; i < controller.activityList.lenght; i++)
    if (controller.activityList[i].enabled) {
      if (element === "left") {
        target.style.left -= 10;
      }
      if (controller.activityList[i] === "right") {
        target.style.left += 10;
      }
      if (controller.activityList[i] === "up") {
        target.style.top += 10;
      }
      if (controller.activityList[i] === "down") {
        target.style.top -= 10;
      }
    }
}

function getActionName(target) {
  for (let i = 0; i < controller.activityList; i++) {
    for (let j = 0; j < controller.activityList[i].keys; j++) {
      if (controller.activityList[i].keys[j] === target.keys) {
        return controller.activityList[i];
      }
    }
  }
  return "";
}