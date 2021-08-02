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
var controller = new InputController(activityList, d);

let attach = document.getElementById('attach');
attach.onclick(function () {
  controller.attach(target, false);
});
let detach = document.getElementById('detach');
detach.onclick(function () {
  controller.detach();
});
let activation = document.getElementById('activation');
activation.onclick(function () {
  target.addEventListener('keydown', getEventType, false);
});
let deactivation = document.getElementById('deactivation');
deactivation.onclick(function () {
  target.addEventListener('keyup', getEventType, false);
});
let extraBind = document.getElementById('extra-bind');
extraBind.onclick(function () {
  //TODO Добавить активность
});


document.addEventListener(controller.ACTION_ACTIVATED, function () {

}, false);
document.addEventListener(controller.ACTION_DEACTIVATED, function () {

}, false);