//Плагин для кнопок клавиатуры. Ловит события клавиатуры и обрабатывает их. Дает знать контроллеру, если действие изменило свою активность

export default class PlaginKeyboard {

  constructor({ onActionChanged }) {
    this.onActionChanged = onActionChanged;
    document.addEventListener('keydown', this.onkeyDown);
    document.addEventListener('keyup', this.onkeyUp);
  }

  destructor() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  addAction({ actionName, actionData }) {
    this.actionName = actionName;
    this.actionData = actionData;
  }

  onkeyDown() {
    this.onActionChanged({ actionData, actionName, active: true })   // колбек на активацию плагина
  }
  onkeyUp() {
    this.onActionChanged({ actionData, actionName, active: false })   // колбек на активацию плагина
  }
}