import React from "react";
import { Avatar } from "antd";

class UserCard extends React.Component {
  handleClick = (v1, v2) => {
    const { onClickItem } = this.props;
    if (onClickItem) {
      onClickItem(v1, v2);
    }
  };

  render() {
    const { name, channelId, host, className } = this.props;
    return (
      <div className={"im-user-card " + className} onClick={() => this.handleClick(channelId, host)}>
        <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        {name}
      </div>
    );
  }
}

export default UserCard;
