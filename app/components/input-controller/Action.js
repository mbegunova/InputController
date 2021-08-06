export default class Action {
  name;
  data;

  constructor(actionName, actionData) {
    this.name = actionName || "";
    this.setData(actionData);
  }

  setData(data){
    this.data = data;
    if(this.data.enabled==undefined) data.enabled = true;
    if(this.data.active==undefined) data.active = false;
  }


}


