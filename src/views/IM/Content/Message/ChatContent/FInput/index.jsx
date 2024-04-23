import React from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import { removeLastBlock } from "./removeBlock";

function editorStateToContent(editor) {
  return convertToRaw(editor.getCurrentContent());
}

export default class FInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), _key: 1 };
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  keydownHandler = (e) => {
    const { onChange } = this.props;
    const { editorState } = this.state;
    if (e.keyCode === 13 && e.ctrlKey) {
      if (onChange) {
        onChange(editorStateToContent(removeLastBlock(editorState)));
        this.setState({ editorState: EditorState.createEmpty(), _key: this.state._key + 1 });
      }
    }
  };

  componentDidMount() {
    this.focusEditor();
    document.addEventListener("keydown", this.keydownHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler);
  }

  render() {
    const { _key, editorState } = this.state;
    return (
      <div className="im-f-input" onClick={this.focusEditor}>
        <Editor
          key={_key}
          ref={this.setEditor}
          editorState={editorState}
          onChange={this.onChange}
          placeholder="Ctrl+回车发送"
        />
      </div>
    );
  }
}
