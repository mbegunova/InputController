const activityList = {
  "left": { // название активности(key)
    //values:
    keys: [37, 65], // список кодов кнопок соответствующих активности
    enabled: false // отключенная активность
  },
  "right": {
    keys: [39, 68],
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

const target = document.getElementById('div-window');
const controller = new InputController(activityList, target);


let up = 100;
let left = 100;
document.addEventListener(controller.ACTION_ACTIVATED, function (event) { //Активное действие
  const name = event.detail.action; //получает действие из события
  if (controller.isActionActive(name)) { //если оно активно - перемещаем объект
    if (name === "left") {
      left -= 20;
      target.style.left = left;
    }
    else if (name === "right") {
      left += 20;
      target.style.left = left;
    }
    else if (name === "up") {
      up -= 20;
      target.style.top = up;
    }
    else if (name === "down") {
      up += 20;
      target.style.top = up;
    }
    else if (name === "jump") { //изменение цвета
      target.style.backgroundColor = target.style.backgroundColor === 'aquamarine' ? 'gold' : 'aquamarine';
    }
  }
}, false);


document.addEventListener(controller.ACTION_DEACTIVATED, function () { //Сделать действие не активно

}, false);


const attach = document.getElementById('attach');
attach.onclick = function () {
  controller.attach(target, false);
};
const detach = document.getElementById('detach');
detach.onclick = function () {
  controller.detach();
  controller.enabled = false;
};
const extraBind = document.getElementById('extra-bind');
extraBind.onclick = function () {
  const extraAction = {
    "jump": { // название активности
      keys: [32], // список кодов кнопок соответствующих активности
    }
  }
  controller.bindActions(extraAction);
};

const activation = document.getElementById('activation'); //активация контроллера. Дает реацию на события клавиатуры
activation.onclick = function () {
  controller.enableAction('right');
};

const deactivation = document.getElementById('deactivation'); //запретить контр генерировать события и реагировать на клавиатуру
deactivation.onclick = function () {
  controller.disableAction('right');
};
