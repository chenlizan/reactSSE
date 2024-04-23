import { SSEIMSDK } from "../../SSEIMSDK";
import Channel from "./Channel";

export default class TIMChannel extends Channel {
  constructor() {
    super();
    this.tim = null;
  }

  _onConnect = (event) => this.onConnect(event);
  _onReceive = (event) => this.onReceive(event);

  init() {
    this.tim = SSEIMSDK.create();
  }

  connect({ host, channelId }) {
    this.tim.login().then(() => {
      console.log("登陆成功");
      this.tim.init({ host, channelId });

      this.tim.on(SSEIMSDK.EVENT.Connect, this._onConnect);
      this.tim.on(SSEIMSDK.EVENT.MESSAGE, this._onReceive);
    });
  }

  disconnect() {
    this.tim.logout().then(() => {
      this.tim.off(SSEIMSDK.EVENT.Connect, this._onConnect);
      this.tim.off(SSEIMSDK.EVENT.MESSAGE, this._onReceive);
      this.tim.unInit();
    });
  }

  sendMsg(payload) {
    this.tim.send(payload);
  }
}
