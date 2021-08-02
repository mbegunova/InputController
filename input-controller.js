class InputController {

  enabled; //<bool> Включение/отключение генерации событий контроллера
  focused; //<bool> Находится ли окно с целью контроллера в фокусе
  ACTION_ACTIVATED = "input-controller:action-activated"; //<string> название события активации активности (одна из кнопок активности нажата)
  ACTION_DEACTIVATED = "input-controller:action-deactivated"; //<string> (одна из кнопок активности отжата)


  constructor(actionsToBind, target) { //actionsToBind - объект с активностями, target - DOM элемент, на котором слушаем активности
    target.add
  }

  bindActions(actionsToBind) {

  }

  enableAction(actionName) {

  }

  disableAction(actionName) {

  }

  attach(target, dontEnable) { //dontEnable - Если передано true - не активирует контроллер.
    if (!dontEnable) target.attach
  }

  detach() {

  }

  isActionActive(action) {
    return this.enabled
  }

  isKeyPressed(keyCode) {

  }
}