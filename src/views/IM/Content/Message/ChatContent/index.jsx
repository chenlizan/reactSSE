import React from "react";
import { Icon } from "antd";
import FInput from "./FInput";
import MsgCard from "./MsgCard";

export default class ChatContent extends React.Component {
  handleOnChange = (v) => {
    const { onSend } = this.props;
    if (onSend) {
      onSend(v);
    }
  };

  scrollToBottom() {
    if (this.messagesEnd) {
      const scrollHeight = this.messagesEnd.scrollHeight; //里面div的实际高度  2000px
      const height = this.messagesEnd.clientHeight; //网页可见高度  200px
      const maxScrollTop = scrollHeight - height;
      this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.scrollToBottom();
  }

  render() {
    const { channelData, msgData } = this.props;
    const sse_im_id = localStorage.getItem("sse_im_id");
    return (
      <>
        {channelData && (
          <div className="im-chat-content">
            <div className="header">
              <span className="name">{channelData?.name}</span>
              <Icon type="ellipsis" />
            </div>
            <div
              className="content"
              ref={(el) => {
                this.messagesEnd = el;
              }}
            >
              {msgData.map((it, idx) => {
                return (
                  <MsgCard key={idx} value={it.msg} user_id={it.from_user_id} right={it.from_user_id === sse_im_id} />
                );
              })}
            </div>
            <FInput onChange={this.handleOnChange} />
          </div>
        )}
      </>
    );
  }
}
