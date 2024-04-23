import classNames from "classnames";
import React from "react";
import { Avatar, Icon } from "antd";

class SiderToolbar extends React.Component {
  state = {
    currentContent: "message",
  };

  handleContentChange = (v) => {
    const { onContentChange } = this.props;
    if (onContentChange) {
      onContentChange(v);
      this.setState({ currentContent: v });
    }
  };

  render() {
    const { currentContent } = this.state;
    return (
      <div className="im-sider-toolbar">
        <div style={{ height: 30 }}></div>
        <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Icon
          type="message"
          className={classNames({ curr: currentContent == "message" })}
          onClick={() => this.handleContentChange("message")}
        />
        <Icon
          type="user"
          className={classNames({ curr: currentContent == "user" })}
          onClick={() => this.handleContentChange("user")}
        />
        <Icon className="menu" type="menu" style={{ fontSize: 22 }} />
      </div>
    );
  }
}

export default SiderToolbar;
