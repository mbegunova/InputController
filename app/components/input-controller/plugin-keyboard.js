//Плагин для кнопок клавиатуры. Ловит события клавиатуры и обрабатывает их. Дает знать контроллеру, если действие изменило свою активность

export default class PluginKeyboard {
  actionsList;
  pressedKeyCodes;

  constructor({ onActionChanged }) { //передаем функцию в качестве поля класса PluginKeyboard
    this.onActionChanged = onActionChanged;
    document.addEventListener('keydown', this.onkeyHandler);
    document.addEventListener('keyup', this.onkeyHandler);
    this.actionsList = [];
    this.pressedKeyCodes = [];
  }

  destructor() {
    document.removeEventListener('keydown', this.onkeyHandler);
    document.removeEventListener('keyup', this.onkeyHandler);
  }

  addAction(action) {
    let isChanged = false;
    this.actionsList.forEach((element) => {
      if (element.actionName === action.name) { // 1 == "1" + 1
        element.actionData = action.data;
        isChanged = true;
      }
    });
    if (!isChanged) {
      this.actionsList.push(action);
    }
  }

  onkeyHandler = (e)=>{
    const isDown = e.type === "keydown"
    const {pressedKeyCodes} = this;
    if (!(typeof (this.onActionChanged) === "function")) return;
    if(isDown) { //запомним нажатую кнопку
      if(!this.isKeyPressed(e.keyCode))
        pressedKeyCodes.push(e.keyCode);
    }
    else pressedKeyCodes.splice(pressedKeyCodes.indexOf(e.keyCode), 1);
    const actionObject = this.getActionObject(e);
    this.onActionChanged( actionObject, {active: isDown})   // колбек на активацию плагина
  }

  getActionObject = (btn) => {//Возвращает объект с именем действия и свойствами из списка по коду кнопки
    const { actionsList } = this;
    return actionsList.find((action) => action.data.keys.includes(btn.keyCode)) || {};
  }

  isKeyPressed(keyCode) { //Метод для источника ввода клавиатура. Проверяет нажата ли переданная кнопка в контроллере
    return this.pressedKeyCodes.some(el => el===keyCode);
  }
}
