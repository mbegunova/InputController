class InputController {

  enabled; //<bool> Включение/отключение генерации событий контроллера
  focused; //<bool> Находится ли окно с целью контроллера в фокусе
  ACTION_ACTIVATED = "input-controller:action-activated"; //<string> название события активации активности (одна из кнопок активности нажата)
  ACTION_DEACTIVATED = "input-controller:action-deactivated"; //<string> (одна из кнопок активности отжата)
  activityList;
  target;
  offed;//контроллер отключен и перестает обрабатывать событие


  constructor(actionsToBind, target) { //actionsToBind - объект с активностями, target - DOM элемент, на котором слушаем активности
    this.activityList = actionsToBind;
    this.target = target;
    this.offed = false;
  }

  bindActions(actionsToBind) { //Добавляет в контроллер переданные активности.
    this.activityList = actionsToBind;
    //TODO: добавить собьытия
  }

  enableAction(actionName) {//Включает объявленную активность - включает генерацию событий для этой активности при изменении её статуса. Напр. нажатие кнопки
    if (this.offed) return;
    let isActive = this.isActionActive(actionName);
    if (!isActive) { //не активна
      Object.entries(this.activityList).forEach(([key, value]) => {
        if (key === actionName) {
          value.enabled = true;
          let event = new CustomEvent(this.ACTION_ACTIVATED, {
            detail: { action: actionName }
          });
          document.dispatchEvent(event); //генерирует событие активация действия
        }
      });
    }
  }

  disableAction(actionName) { //Деактивирует объявленную активность - выключает генерацию событий для этой активности. Отжатие кнопки
    Object.entries(this.activityList).forEach(([key, value]) => {
      if (key === actionName) {
        value.enabled = false;
        let event = new CustomEvent(this.ACTION_DEACTIVATED, {
          detail: { name: actionName }
        });
        document.dispatchEvent(event); //генерирует событие активация действия
      }
    });
  }


  attach(target, dontEnable) { //dontEnable - Если передано true - не активирует контроллер.Нацеливает контроллер на переданный DOM-элемент (вешает слушатели).
    if (!dontEnable) {
      this.target = target;
    }
    else {
      target = null;
    }
  }

  detach() { //Отцепляет контроллер от активного DOM-элемента и деактивирует контроллер.
    this.target = null;
    document.dispatchEvent(this.EVENT_DEACTIVATED);
  }

  isActionActive(action) { //Проверяет активирована ли переданная активность в контроллере
    let isActive = false;
    Object.entries(this.activityList).forEach(([key, value]) => {
      if (key === action) {
        isActive = value.enabled;
        return;
      }
    });
    return isActive;
  }

  isKeyPressed(keyCode) { //Метод для источника ввода клавиатура. Проверяет нажата ли переданная кнопка в контроллере
    isPassed = false;
    Object.entries(this.activityList).forEach(([key, value]) => {
      if (value === actionName) {
        key.forEach(k => {
          if (k === keyCode) {
            isPassed = value.enabled;
            return;
          }
        });
      }
    });
    return isPassed;
  }
}
window.InputController = InputController;