import React, { Component, PropTypes } from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';
import { Map } from 'immutable';

// local reference
import style from './TestEditor';
import blockRenderHandler from './blockRenderHandler';

class TestEditor extends Component {
  constructor(props) {
    super(props);
    const { rawContent } = props;
    this.state = {
      editorState: rawContent ? EditorState.createWithContent(convertFromRaw(rawContent)) : EditorState.createEmpty(),
    };
    // custom function binding
    this._focus = () => this.editorRef.focus();
    this._onChange = (editorState) => this.setState({ editorState });
    this._handleKeyCommand = command => {
      const { editorState } = this.state;
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this._onChange(newState);
        return true;
      }
      return false;
    };
    this._blockRenderer = (block) => {
      if (block.getType() === 'atomic') {
        return blockRenderHandler.bind(this)(block);
      }
      return null;
    };
  }

  render() {
    const { readOnly } = this.props;
    return (
      <div className={style.editorContainer} >
        <div className={style.editorRoot}>
          <div className={style.editorEditor} onClick={this._focus}>
            <Editor
              blockRendererFn={this._blockRenderer}
              editorState={this.state.editorState}
              handleKeyCommand={this._handleKeyCommand}
              onChange={this._onChange}
              placeholder="Start a document..."
              readOnly={readOnly}
              ref={(ref) => { this.editorRef = ref; }}
              spellCheck
            />
          </div>
        </div>
      </div>
    );
  }
}
TestEditor.propTypes = {
};
export default TestEditor;
