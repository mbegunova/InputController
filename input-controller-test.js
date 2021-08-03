const activityList = {
  "left": { // название активности
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

let target = document.getElementById('div-window');
let controller = new InputController(activityList, target);


let up = 20;
let left = 20;
document.addEventListener(controller.ACTION_ACTIVATED, function (event) { //Активное действие
  let name = event.detail.action; //получает действие из события
  if (controller.isActionActive(name)) { //если оно активно - перемещаем объект
    debugger
    if (name === "left") {
      left -= 20;
      target.style.left = left;
      console.log("left");
    }
    else if (name === "right") {
      left += 20;
      target.style.left = left;
      console.log("right");
    }
    else if (name === "up") {
      up -= 20;
      target.style.top = up;
      console.log("up");
    }
    else if (name === "down") {
      up += 20;
      target.style.top = up;
      console.log("down");
    }
  }
}, false);


document.addEventListener(controller.ACTION_DEACTIVATED, function (event) { //Сделать действие не активно
  document.removeEventListener('keydown', function (e) {
    let name = getActionName(e);
    controller.enableAction(name);//передается имя активности
  })
}, false);


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

let activation = document.getElementById('activation'); //активация контроллера
activation.onclick = function (event) {
  controller.offed = false;
  document.addEventListener('keydown', function (e) {
    let name = getActionName(e);
    debugger;
    controller.enableAction(name); //передается имя активности
  })

};

let deactivation = document.getElementById('deactivation'); //запретить контр генерировать события
deactivation.onclick = function () {
  controller.offed = true;
};

function getActionName(target) { //Возвращает название действия из списка по кнопке(target)
  let found = "";
  let list = controller.activityList;
  Object.entries(list).forEach(([key, value]) => {
    value.keys.forEach(k => {
      if (k === target.keyCode) {
        found = key;

      }
    });
  });
  return found;
}
