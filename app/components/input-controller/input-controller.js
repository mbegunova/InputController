import pluginsSettings from "./pluginSettings";
import Action from "./Action";
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
    this.activityList = [];
    Object
      .entries(actionsToBind)
      .forEach(([actionName, actionData]) => {
        const action = new Action(actionName, actionData);
         this.activityList.push(action);
        this.pluginConnectionCheck(action);
      });
    this.target = target;
    this.enabled = false;
    this.focused = true;
  }

  pluginConnectionCheck(action) {
    const pluginData = pluginsSettings
      .find(({ keys }) => keys.some(kl => !!action.data[kl])); // кто знает как это обрабатывать?
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
    plugin.addAction(action) // чел, давай обрабатывай
  }

  onActionChanged(action, {active: activity }) {
    if (activity===undefined) return;
    if (!this.enabled) return;
    const { activityList } = this;
    if (this.focused && this.enabled) {
      if (!(((activityList[activityList.indexOf(action)]||[]).data||[]).enabled || false)) return;
      activityList[activityList.indexOf(action)].data.active = !!activity;
      const event = new CustomEvent(activity ? InputController.ACTION_ACTIVATED : InputController.ACTION_DEACTIVATED, {
        detail: { action: action.name }
      });
      document.dispatchEvent(event); //генерирует событие активация действия
    }
  }

  bindActions(actionsToBind) { //Добавляет в контроллер переданные активности.
    if(this.target==null||!this.enabled) return;
    const { activityList } = this;
    Object.entries(actionsToBind).forEach(([actionName, actionData]) => {
      let isActionFound = activityList.some(el => el.name ===actionName);
      const action = new Action(actionName, actionData);
      if (!!isActionFound) {
        this.mergeActions(action); //изменим имеющийся
      } else {
        activityList.push(action); //добавим новый action
      }
      this.pluginConnectionCheck(action);
    });
  }

  mergeActions(action) { //Изменяет уже имеющиеся действия в actionList
    this.activityList.find(elem => elem.name === action.name).setData(action.data);
  }

  enableAction(actionName) {//Включает объявленную активность - включает генерацию событий для этой активности при изменении её статуса. Напр. нажатие кнопки
    this.setActionEnable(actionName, true);
  }

  disableAction(actionName) { //Деактивирует объявленную активность - выключает генерацию событий для этой активности. Отжатие кнопки
    this.setActionEnable(actionName, false);
  }

  setActionEnable(actionName, enabledValue) { //Задает активности переданное значение активности
    if (!this.enabled) return;
    this.activityList.forEach((element) => {
      if (element.name === actionName) {
        element.data.enabled = enabledValue;
      }
    });
  }

  attach(target, dontEnable) { //dontEnable - Если передано true - не активирует контроллер.Нацеливает контроллер на переданный DOM-элемент (вешает слушатели).
    document.addEventListener('visibilityChange', this.visibilityChangeHandler, false);
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
    document.removeEventListener('visibilityChange', this.visibilityChangeHandler, false);
  }

  isActionActive(actionName) { //Проверяет активирована ли переданная активность в контроллере
    return ((this.activityList.find(el=> el.name === actionName) || []).data || []).active ||  false;
  }
}

window.InputController = InputController; //объеявляем класс глобальной переменной
