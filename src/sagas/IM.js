import { eventChannel } from "redux-saga";
import { fork, take, call, put, cancel } from "redux-saga/effects";
import TIMChannel from "../IM/channels/TIMChannel";
import ImActions from "../action/imActions";

function* getConnectInfo() {
  try {
    const id = localStorage.getItem("channelId");
    const host = localStorage.getItem("host");
    return { host: host, channelId: id };
  } catch (e) {}
}

function connect(conInfo) {
  const Channel = new TIMChannel();
  Channel.init(conInfo);
  Channel.connect(conInfo);
  return new Promise((resolve) => {
    resolve(Channel);
    Channel.on("onConnect", (event) => {
      console.log("即时通讯 连接成功");
    });
  });
}

function subscribe(channel) {
  return eventChannel((emit) => {
    channel.on("onReceive", (event) => {
      emit(ImActions.receiveMessage(event));
    });
    return () => {};
  });
}

function* read(channel) {
  const eventChannel = yield call(subscribe, channel);
  while (true) {
    let action = yield take(eventChannel);
    yield put(action);
  }
}

function* write(channel) {
  while (true) {
    const { payload } = yield take(ImActions.sendMessage().type);
    channel.sendMsg(payload);
  }
}

function* handleIO(channel) {
  yield fork(read, channel);
  yield fork(write, channel);
}

function* flow() {
  while (true) {
    yield take(ImActions.startListener().type);
    console.log("即时通讯 启动");
    const conInfo = yield call(getConnectInfo);
    if (!!conInfo?.host && !!conInfo?.channelId) {
      try {
        let channel = yield call(connect, conInfo);
        const task = yield fork(handleIO, channel);
        yield take(ImActions.stopListener().type);
        console.log("即时通讯 停止");
        channel.disconnect && channel.disconnect();
        yield cancel(task);
      } catch (e) {
        console.log("flow", e);
      }
    }
  }
}

export function* imSaga() {
  yield fork(flow);
}
