
import Draft from 'draft-js';
import { Map } from 'immutable';
import React from 'react';

import TeXBlock from './TeXBlock';
import { content } from '../data/content';
import { insertTeXBlock } from '../modifiers/insertTeXBlock';
import { removeTeXBlock } from '../modifiers/removeTeXBlock';

let { Editor, EditorState, RichUtils } = Draft;

export default class TeXEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(content),
      liveTeXEdits: Map(),
    };

    this._blockRenderer = (block) => {
      if (block.getType() === 'atomic') {
        console.log(block);
        return {
          component: TeXBlock,
          editable: false,
          props: {
            onStartEdit: (blockKey) => {
              let { liveTeXEdits } = this.state;
              this.setState({ liveTeXEdits: liveTeXEdits.set(blockKey, true) });
            },
            onFinishEdit: (blockKey) => {
              let { liveTeXEdits } = this.state;
              this.setState({ liveTeXEdits: liveTeXEdits.remove(blockKey) });
            },
            onRemove: (blockKey) => this._removeTeX(blockKey),
          },
        };
      }
      return null;
    };

    this._focus = () => this.refs.editor.focus();
    this._onChange = (editorState) => this.setState({ editorState });

    this._handleKeyCommand = command => {
      let { editorState } = this.state;
      let newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this._onChange(newState);
        return true;
      }
      return false;
    };

    this._removeTeX = (blockKey) => {
      let { editorState, liveTeXEdits } = this.state;
      this.setState({
        liveTeXEdits: liveTeXEdits.remove(blockKey),
        editorState: removeTeXBlock(editorState, blockKey),
      });
    };

    this._insertTeX = () => {
      this.setState({
        liveTeXEdits: Map(),
        editorState: insertTeXBlock(this.state.editorState),
      });
    };
  }

  /**
   * While editing TeX, set the Draft editor to read-only. This allows us to
   * have a textarea within the DOM.
   */
  render() {
    return (
      <div className="TexEditor-container">
        <div className="TeXEditor-root">
          <div className="TeXEditor-editor" onClick={this._focus}>
            <Editor
              blockRendererFn={this._blockRenderer}
              editorState={this.state.editorState}
              handleKeyCommand={this._handleKeyCommand}
              onChange={this._onChange}
              placeholder="Start a document..."
              readOnly={this.state.liveTeXEdits.count()}
              ref="editor"
              spellCheck
            />
          </div>
        </div>
        <button onClick={this._insertTeX} className="TeXEditor-insert">
          {'Insert new TeX'}
        </button>
      </div>
    );
  }
}
