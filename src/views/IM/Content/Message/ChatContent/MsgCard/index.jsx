import _ from "lodash";
import classNames from "classnames";
import React from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { Avatar } from "antd";
import moment from "moment";

function isJSON(str, pass_object) {
  if (pass_object && _.isObject(str)) return true;

  if (!_.isString(str)) return false;

  str = str.replace(/\s/g, "").replace(/\n|\r/, "");

  if (/^\{(.*?)\}$/.test(str)) return /"(.*?)":(.*?)/g.test(str);

  if (/^\[(.*?)\]$/.test(str)) {
    return str
      .replace(/^\[/, "")
      .replace(/\]$/, "")
      .replace(/},{/g, "}\n{")
      .split(/\n/)
      .map(function (s) {
        return isJSON(s);
      })
      .reduce(function (prev, curr) {
        return !!curr;
      });
  }

  return false;
}

function getDraftEditorState(json) {
  if (_.isObject(json)) {
    return EditorState.createWithContent(convertFromRaw(json));
  } else if (json === "" || !json) {
    return EditorState.createEmpty();
  } else if (isJSON(json)) {
    return EditorState.createWithContent(convertFromRaw(JSON.parse(json)));
  } else {
    return EditorState.createWithContent(
      convertFromRaw({
        entityMap: {},
        blocks: [
          {
            type: "paragraph",
            text: json,
          },
        ],
      })
    );
  }
}

export default class MsgCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: _.isEmpty(props.value) ? EditorState.createEmpty() : getDraftEditorState(props.value) };
  }
  render() {
    const { right, user_id } = this.props;
    return (
      <div>
        <div className={classNames("f-msg-card", { right })}>{`${user_id}`}</div>
        {/*<div className={classNames("f-msg-card", { right })} style={{ fontSize: 10 }}>*/}
        {/*  {moment().format("MM-DD HH:mm")}*/}
        {/*</div>*/}
        <div className={classNames("f-msg-card", { right })}>
          <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <Editor readOnly editorState={this.state.editorState} />
        </div>
      </div>
    );
  }
}
