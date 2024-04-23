import { ContentState, EditorState } from "draft-js";

export function removeLastBlock(editorState) {
  const content = editorState.getCurrentContent();
  const lastBlockKey = editorState.getCurrentContent().getLastBlock().getKey();
  const blocks = content.getBlockMap().filter((it) => it.getKey() !== lastBlockKey);
  const newContentState = ContentState.createFromBlockArray(blocks.toArray(), content.getEntityMap());
  return EditorState.createWithContent(newContentState);
}
