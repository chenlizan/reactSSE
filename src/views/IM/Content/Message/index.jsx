import _ from "lodash";
import classNames from "classnames";
import fetch from "cross-fetch";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SSE } from "sse.js";
import { Input } from "antd";
import UserCard from "./UserCard";
import ChatContent from "./ChatContent";
import ImActions from "../../../../action/imActions";

const channelData = [
  { id: "10001", host: "http://10.130.212.212:5000", name: "IM交流-逻辑ID-10001" },
  { id: "10002", host: "http://10.130.212.212:5000", name: "IM交流-逻辑ID-10002" },
];

@connect(
  (state, props) => ({
    newMessage: state.IM.message,
  }),
  (dispatch, props) => ({
    ImDispatcher: bindActionCreators(ImActions, dispatch),
  })
)
class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channelId: null,
      msgData: [],
    };

    this.source = null;
  }

  cb = (e) => {
    const payload = JSON.parse(e.data);
    this.state.msgData.push(payload);
    this.setState({ msgData: this.state.msgData });
  };

  componentDidMount() {
    if (!localStorage.getItem("sse_im_id")) {
      localStorage.setItem("sse_im_id", "sse_im_id " + Date.now());
    }
  }

  componentWillUnmount() {
    // this.source.removeEventListener("message", this.cb);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { newMessage } = nextProps;
    this.cb(newMessage);
  }

  handleClickItem = (v1, v2) => {
    const { ImDispatcher } = this.props;
    const { channelId } = this.state;

    localStorage.setItem("channelId", v1);
    localStorage.setItem("host", v2);

    if (channelId !== v1) {
      ImDispatcher.stopListener();
    }
    ImDispatcher.startListener();
    this.setState({ channelId: v1, msgData: [] });

    // this.setState({ channelId: v1, msgData: [] });
    // if (this.source === null) {
    //   this.source = new SSE(`${v2}/stream?channelId=` + v1);
    //   this.source.addEventListener("message", this.cb);
    // } else {
    //   this.source.removeEventListener("message", this.cb);
    //   this.source.close();
    //   this.source = null;
    //   this.source = new SSE(`${v2}/stream?channelId=` + v1);
    //   this.source.addEventListener("message", this.cb);
    // }
  };

  handleOnSend = (v) => {
    const { channelId } = this.state;

    // const host = localStorage.getItem("host");
    // fetch(`${host}/send`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({ channelId, from_user_id: localStorage.getItem("sse_im_id"), msg: v }),
    // }).finally();

    const { ImDispatcher } = this.props;
    ImDispatcher.sendMessage(JSON.stringify(v));
  };

  render() {
    const { channelId, msgData } = this.state;
    return (
      <div className="im-message">
        <div className="list">
          <Input.Search placeholder="搜索" style={{ padding: "8px" }} />
          {channelData.map((it, index) => {
            return (
              <UserCard
                className={classNames({ select: channelId === it.id })}
                key={index}
                name={it.name}
                channelId={it.id}
                host={it.host}
                onClickItem={this.handleClickItem}
              />
            );
          })}
        </div>
        <div className="details">
          <ChatContent
            channelData={_.find(channelData, { id: channelId })}
            msgData={msgData}
            onSend={this.handleOnSend}
          />
        </div>
      </div>
    );
  }
}

export default Message;
