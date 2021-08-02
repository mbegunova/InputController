import InputController from "input-controller.js";
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


let d = document.getElementById('div-window');
let controller = new InputController(activityList, d);
controller.bin
