import React from "react";
import SiderToolbar from "./SiderToolbar";
import Content from "./Content";

class Main extends React.Component {
  state = {
    currentContent: "message",
  };

  render() {
    const { currentContent } = this.state;
    return (
      <div className="im-main">
        <SiderToolbar onContentChange={(v) => this.setState({ currentContent: v })} />
        <Content currentContent={currentContent} />
      </div>
    );
  }
}

export default Main;
