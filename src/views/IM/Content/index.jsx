import React from "react";
import Message from "./Message";
import User from "./User";

class Content extends React.Component {
  render() {
    const { currentContent } = this.props;
    return (
      <div className="im-content">
        {currentContent === "message" && <Message />}
        {currentContent === "user" && <User />}
      </div>
    );
  }
}

export default Content;
