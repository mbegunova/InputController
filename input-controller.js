import plaginSettings from "./plaginSettings";

class InputController {

  enabled; //<bool> Включение/отключение генерации событий контроллера
  focused; //<bool> Находится ли окно с целью контроллера в фокусе
  ACTION_ACTIVATED = "input-controller:action-activated"; //<string> название события активации активности (одна из кнопок активности нажата)
  ACTION_DEACTIVATED = "input-controller:action-deactivated"; //<string> (одна из кнопок активности отжата)
  activityList; //список активностей
  target; //объект, управляемый контроллером
  plugins; //помощники //МАССИВ ПОДКЛюченных ПЛАГИНОВ

  constructor(actionsToBind, target) { //actionsToBind - объект с активностями, target - DOM элемент, на котором слушаем активности
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.activityList = actionsToBind;
    Object.entries(this.activityList).forEach(([actionName, actionData]) => {
      if (actionData.enabled === undefined) actionData.enabled = true;

      const pluginData = pluginsSettings.find(({ keys }) => keys.some(key => !!actionData[key])); // кто знает как это обрабатывать?
      const { pluginClass } = plaginData; //НАШЛИ искомый нами из списка плагинКласс
      const isAdded = false; // помощник,ты дома? 
      let plugin; //создаем новый или читаем из свойств контроллера
      if (!isAdded) { //не дома
        plugin = new pluginClass({
          onActionChanged: this.onActionChanged // скажи, когда экшен активируется/деактивируется  - присвоение полю плагин класса ссылки на функции из контроллера
        }); // го домой

      } else {
        plugin = plugins[0]; // в какой комнате сидишь - считываем из свойств настройки
      }
      plugin.addAction({ actionName, actionData }) // чел, давай обрабатывай

    });
    this.target = target;
    this.enabled = false;
    this.focused = true;
  }

  onActionChanged({ actionName, actionData, activity }) {
    if (this.focused && this.enabled) {
      const event;
      if (activity) {
        event = new CustomEvent(this.ACTION_ACTIVATED, {
          detail: { action: actionName }
        });
      }
      else {
        event = new CustomEvent(this.ACTION_DEACTIVATED, {
          detail: { name: actionName }
        });
      }
    }
    document.dispatchEvent(event); //генерирует событие активация действия

  }

  mouseOutHandler() {
    this.focused = false;
  }
  mouseOverHandler() {
    this.focused = true;
  }

  // getActionName(btn) { //Возвращает название действия из списка по кнопке(target)
  //   const { activityList } = this;
  //   return (Object.entries(activityList).find(([, value]) => value.keys.includes(btn.keyCode)) || [])[0] || "";
  // }

  bindActions(actionsToBind) { //Добавляет в контроллер переданные активности.
    const { activityList } = this;
    Object.entries(actionsToBind).forEach(([actionName, actionData]) => {
      if (activityList.hasOwnProperty(actionName)) {
        this.mergeActions(activityList[actionName], actionData);
      }
      else activityList[actionName] = actionData;
    });
  }

  mergeActions(target, newAction) { //Изменяет уже имеющиеся действия в actionList
    target.keys = newAction.keys;
    if (newAction.enabled === undefined) { target.enabled = true; }
    else target.enabled = newAction.enabled;
  }

  enableAction(actionName) {//Включает объявленную активность - включает генерацию событий для этой активности при изменении её статуса. Напр. нажатие кнопки
    if (!this.enabled) return;
    Object.entries(this.activityList).forEach(([key, value]) => {
      if (key === actionName) {
        value.enabled = true;
      }
    });
  }

  disableAction(actionName) { //Деактивирует объявленную активность - выключает генерацию событий для этой активности. Отжатие кнопки
    if (!this.enabled) return;
    Object.entries(this.activityList).forEach(([key, value]) => {
      if (key === actionName) {
        if (this.isActionActive(actionName)) {
          value.enabled = false;
        }
      }
    });
  }

  attach(target, dontEnable) { //dontEnable - Если передано true - не активирует контроллер.Нацеливает контроллер на переданный DOM-элемент (вешает слушатели).
    document.body.addEventListener('mouseout', this.mouseOutHandler);
    document.body.addEventListener('mouseover', this.mouseOverHandler);
    if (!dontEnable) {
      this.target = target;
    }
    if (this.target != null) {
      this.enabled = true;
    }
  }

  detach() { //Отцепляет контроллер от активного DOM-элемента и деактивирует контроллер.
    document.body.removeEventListener('mouseout', this.mouseOutHandler);
    document.body.removeEventListener('mouseover', this.mouseOverHandler);
    this.target = null;
    this.enabled = true;
  }

  isActionActive(action) { //Проверяет активирована ли переданная активность в контроллере
    return (Object.entries(activityList).find(([key,]) => key === action) || [])[1].enabled || false;
  }



  isKeyPressed(keyCode) { //Метод для источника ввода клавиатура. Проверяет нажата ли переданная кнопка в контроллере
    return (Object.entries(activityList).find(([key, value]) => key === action && value.keys.includes(keyCode)) || [])[1].enabled || false;
  }

}
window.InputController = InputController;