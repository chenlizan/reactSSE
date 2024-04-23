import { createAction } from "redux-actions";

const startListener = createAction("IM_START_LISTENER");
const stopListener = createAction("IM_STOP_LISTENER");
const sendMessage = createAction("IM_SEND_MESSAGE");
const receiveMessage = createAction("IM_RECEIVE_MESSAGE");

export default { startListener, stopListener, receiveMessage, sendMessage };
