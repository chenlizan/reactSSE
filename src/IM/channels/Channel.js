import { EventEmitter } from "events";

export default class Channel extends EventEmitter {
    init() {
        throw new Error("没有实现该方法");
    }

    connect() {
        throw new Error("没有实现该方法");
    }

    disconnect() {
        throw new Error("没有实现该方法");
    }

    sendMsg() {
        throw new Error("没有实现该方法");
    }

    onConnect(event) {
        this.emit("onConnect", event);
    }

    onConnectFailed(event) {
        this.emit("onConnectFailed", event);
    }

    onDisconnect(event) {
        this.emit("onDisconnect", event);
    }

    onError(event, error) {
        this.emit("onError", event, error);
    }

    onReceive(event) {
        this.emit("onReceive", event);
    }

    onKickedOffline(event) {
        this.emit("onKickedOffline", event);
    }

    onUserSigExpired(event) {
        this.emit("onUserSigExpired", event);
    }
}