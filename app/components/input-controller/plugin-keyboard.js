//Плагин для кнопок клавиатуры. Ловит события клавиатуры и обрабатывает их. Дает знать контроллеру, если действие изменило свою активность

export default class PluginKeyboard {
  actionsList;

  constructor({ onActionChanged }) {
    this.onActionChanged = onActionChanged;
    document.addEventListener('keydown', this.onkeyDownHandler);
    document.addEventListener('keyup', this.onkeyUpHandler);
    this.actionsList = [];
  }

  destructor() {
    document.removeEventListener('keydown', this.onkeyDownHandler);
    document.removeEventListener('keyup', this.onkeyUpHandler);
  }

  addAction({ actionName, actionData }) {
    let isChanged = false;
    Object.entries(this.actionsList).forEach(([k,v])=>{
      if(v.actionName === actionName) { // 1 == "1" + 1
        v.actionData = actionData;
        isChanged = true;
      }
    });
    if(!isChanged) {
      let action = {actionName, actionData};
      let a = Object.assign({}, action);
      this.actionsList.push(a);
    }
  }

  onkeyDownHandler = (e) => {
    if (!typeof(this.onActionChanged)==="function") return;
    const actionObject = this.getActionObject(e);
    const actionName = actionObject[1].actionName || "";
    const actionData = actionObject[1].actionData || "";
    this.onActionChanged({ actionData, actionName, active: true })   // колбек на активацию плагина
  }
  onkeyUpHandler = (e) => {
    const actionObject = this.getActionObject(e);
    const actionName = actionObject[1].actionName || "";
    const actionData = actionObject[1].actionData || "";
    this.onActionChanged({actionData, actionName, active: false})   // колбек на активацию плагина
  }

  getActionObject = (btn) =>{//Возвращает объект с именем действия и свойствами из списка по коду кнопки
    const { actionsList } = this;
    return (Object.entries(actionsList).find(([k,v]) => v.actionData.keys.includes(btn.keyCode))||[];
  }
}
