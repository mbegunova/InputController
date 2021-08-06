import pluginsSettings from "./pluginSettings";

class InputController {

  enabled; //<bool> Включение/отключение генерации событий контроллера
  focused; //<bool> Находится ли окно с целью контроллера в фокусе
  static ACTION_ACTIVATED = "input-controller:action-activated"; //<string> название события активации активности (одна из кнопок активности нажата)
  static ACTION_DEACTIVATED = "input-controller:action-deactivated"; //<string> (одна из кнопок активности отжата)
  activityList; //список активностей
  target; //объект, управляемый контроллером
  plugins; //помощники //МАССИВ ПОДКЛюченных ПЛАГИНОВ

  constructor(actionsToBind, target) { //actionsToBind - объект с активностями, target - DOM элемент, на котором слушаем активности
    this.onActionChanged = this.onActionChanged.bind(this);
    this.plugins = [];
    this.activityList = actionsToBind;
    Object
      .entries(this.activityList)
      .forEach(([actionName, actionData]) => {
        if (actionData.enabled === undefined) actionData.enabled = true;
        if (actionData.active === undefined) actionData.active = false;
        this.pluginConnectionCheck(actionName, actionData);
      });
    this.target = target;
    this.enabled = false;
    this.focused = true;
  }

  pluginConnectionCheck(actionName, actionData) {
    const pluginData = pluginsSettings
      .find(({ keys }) => keys.some(key => !!actionData[key])); // кто знает как это обрабатывать?
    if (pluginData.isUndefined) return;
    const { pluginClass } = pluginData; //НАШЛИ искомый нами из списка плагинКласс
    if (pluginClass.isUndefined) return;
    const isAdded = this.plugins.some(plugin => plugin instanceof pluginData.pluginClass);
    let plugin; //создаем новый или читаем из свойств контроллера
    if (!isAdded) { //не дома
      plugin = new pluginClass({
        onActionChanged: this.onActionChanged // скажи, когда экшен активируется/деактивируется  - присвоение полю плагин класса ссылки на функции из контроллера
      }); // го домой
      this.plugins.push(plugin);

    } else {
      plugin = this.plugins[0]; // в какой комнате сидишь - считываем из свойств настройки
    }
    plugin.addAction({ actionName, actionData }) // чел, давай обрабатывай
  }

  onActionChanged({ actionName, actionData, active: activity }) {
    if (activity.isUndefined) return;
    const { activityList } = this;

    if (this.focused && this.enabled) {
      if (!Object.values(activityList[actionName])[1]) return;
      activityList[actionName].active = !!activity;
      const event = new CustomEvent(activity ? InputController.ACTION_ACTIVATED : InputController.ACTION_DEACTIVATED, {
        detail: { action: actionName }
      });
      document.dispatchEvent(event); //генерирует событие активация действия
    }
  }

  bindActions(actionsToBind) { //Добавляет в контроллер переданные активности.
    const { activityList } = this;
    Object.entries(actionsToBind).forEach(([actionName, actionData]) => {
      if (activityList.hasOwnProperty(actionName)) {
        this.mergeActions(activityList[actionName], actionData);
      } else {
        activityList[actionName] = actionData;
      }
      this.pluginConnectionCheck(actionName, actionData);
    });
  }

  mergeActions(target, newAction) { //Изменяет уже имеющиеся действия в actionList
    target.keys = newAction.keys;
    if (newAction.enabled === undefined) {
      target.enabled = true;
    } else target.enabled = newAction.enabled;
  }

  enableAction(actionName) {//Включает объявленную активность - включает генерацию событий для этой активности при изменении её статуса. Напр. нажатие кнопки
    if (!this.enabled) return;
    this.setActionEnable(actionName, true);
  }

  disableAction(actionName) { //Деактивирует объявленную активность - выключает генерацию событий для этой активности. Отжатие кнопки
    if (!this.enabled) return;
    this.setActionEnable(actionName, false);
  }

  setActionEnable(actionName, enabledValue) {
    Object.entries(this.activityList).forEach(([key, value]) => {
      if (key === actionName) {
        value.enabled = enabledValue;
      }
    });
  }

  attach(target, dontEnable) { //dontEnable - Если передано true - не активирует контроллер.Нацеливает контроллер на переданный DOM-элемент (вешает слушатели).
    document.addEventListener('visibilitychange', this.visibilityChangeHandler, false);
    if (!dontEnable) {
      this.target = target;
    }
    if (this.target != null) {
      this.enabled = true;
    }
  }

  visibilityChangeHandler = () => {
    if (document.hidden) {
      console.log('Документ был не в фокусе');
    } else {
      console.log('Документ снова в фокусе');
    }
  }

  detach() { //Отцепляет контроллер от активного DOM-элемента и деактивирует контроллер.
    this.target = null;
    this.enabled = false;
    document.removeEventListener('visibilitychange', this.visibilityChangeHandler, false);
  }

  isActionActive(action) { //Проверяет активирована ли переданная активность в контроллере
    const { activityList } = this;
    return (Object.entries(activityList).find(([key,]) => key === action) || [])[1].active || false;
  }

  isKeyPressed(keyCode) { //Метод для источника ввода клавиатура. Проверяет нажата ли переданная кнопка в контроллере
    return (Object.entries(activityList).find(([key, value]) => key === action && value.keys.includes(keyCode)) || [])[1].enabled || false;
  }

}

window.InputController = InputController;
