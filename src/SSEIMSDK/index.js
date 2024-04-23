import fetch from "cross-fetch";
import { SSE } from "sse.js";

export class SSEIMSDK {
  constructor(props) {
    this.host = null;
    this.channelId = null;
    this.source = null;
  }

  static EVENT = {
    SUCCESS: "success",
    MESSAGE: "message",
    Connect: "open",
  };

  static create(options) {
    if (!SSEIMSDK.instance) {
      SSEIMSDK.instance = new SSEIMSDK(options);
    }
    return SSEIMSDK.instance;
  }

  init({ host, channelId }) {
    if (host && channelId) {
      this.host = host;
      this.channelId = channelId;
    }
    if (SSEIMSDK.instance) {
      this.source = new SSE(`${this.host}/stream?channelId=${this.channelId}`);
    }
  }

  unInit() {
    if (SSEIMSDK.instance) {
      this.source.close();
      this.source = null;
    }
  }

  login() {
    if (SSEIMSDK.instance) {
      return new Promise((resolve) => resolve());
    }
  }

  logout() {
    if (SSEIMSDK.instance) {
      return new Promise((resolve) => resolve());
    }
  }

  on(eventType, listener) {
    if (SSEIMSDK.instance) {
      this.source.addEventListener(eventType, listener);
    }
  }

  off(eventType, listener) {
    if (SSEIMSDK.instance) {
      this.source.removeEventListener(eventType, listener);
    }
  }

  send(payload) {
    fetch(`${this.host}/send`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      },
      method: "POST",
      body: JSON.stringify({
        channelId: this.channelId,
        from_user_id: localStorage.getItem("sse_im_id"),
        msg: payload,
      }),
    }).finally();
  }
}
