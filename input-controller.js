class InputController {

  enabled; //<bool> Включение/отключение генерации событий контроллера
  focused; //<bool> Находится ли окно с целью контроллера в фокусе
  ACTION_ACTIVATED = "input-controller:action-activated"; //<string> название события активации активности (одна из кнопок активности нажата)
  ACTION_DEACTIVATED = "input-controller:action-deactivated"; //<string> (одна из кнопок активности отжата)
  activityList;
  target;


  constructor(actionsToBind, target) { //actionsToBind - объект с активностями, target - DOM элемент, на котором слушаем активности
    this.activityList = actionsToBind;
    this.target = target;
  }

  bindActions(actionsToBind) { //Добавляет в контроллер переданные активности.
    this.activityList = actionsToBind;
    //TODO: добавить собьытия
  }

  enableAction(actionName) {//Включает объявленную активность - включает генерацию событий для этой активности при изменении её статуса. 
    let isActive = this.isActionActive(actionName)
    if (!isActive) { //не активна
      for (let i = 0; i < this.activityList; i++) {
        if (this.activityList[i] === actionName) {
          this.activityList[i].enabled = true;
          document.dispatchEvent(this.ACTION_ACTIVATED); //генерирует событие активация действия
          this.attach(this.target, isActive);
        }
      }
    }
  }

  disableAction(actionName) { //Деактивирует объявленную активность - выключает генерацию событий для этой активности.
    for (let i = 0; i < this.activityList; i++) {
      if (this.activityList[i] === actionName) {
        this.activityList[i].enabled = false;
      }
    }
  }

  attach(target, dontEnable) { //dontEnable - Если передано true - не активирует контроллер.Нацеливает контроллер на переданный DOM-элемент (вешает слушатели).
    if (!dontEnable) {
      let myEvent = new CustomEvent(this.ACTION_ACTIVATED, {
        detail: {},
        bubbles: true,
        cancelable: true,
        composed: false,
      });
      document.dispatchEvent(myEvent);
    }
  }

  detach() {
    let myEvent = new CustomEvent(this.ACTION_ACTIVATED, {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    document.dispatchEvent(myEvent);
  }

  isActionActive(action) { //Проверяет активирована ли переданная активность в контроллере
    for (let i = 0; i < this.activityList; i++) {
      if (this.activityList[i] === actionName) {
        return this.activityList[i].enabled;
      }
    }
    return false;
  }

  isKeyPressed(keyCode) { //Метод для источника ввода клавиатура. Проверяет нажата ли переданная кнопка в контроллере

    for (let i = 0; i < this.activityList; i++) {
      if (this.activityList[i] === actionName) {
        for (let j = 0; j < this.activityList[i].keys; j++) {
          if (this.activityList[i].keys[j] === keyCode) return this.activityList[i].enabled;
        }
      }
    }
    return false;
  }
}
window.InputController = InputController;