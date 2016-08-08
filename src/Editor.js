import React, { Component, PropTypes } from 'react';
import { EditorState, convertToRaw, DefaultDraftBlockRenderMap } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createDndPlugin from 'draft-js-dnd-plugin';
import createToolbarPlugin from 'draft-js-toolbar-plugin';
import {Map} from 'immutable';
import  style from './Editor.css';


class KeyPathEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.value
        ? EditorState.push(EditorState.createEmpty(), convertFromRaw(props.value))
        : EditorState.createEmpty(),
      draggingOver: false,
    };
    const
      dndPlugin = createDndPlugin(
        {
          allowDrop: true,
          handleDefaultData: (blockType) => {
            console.log(blockType);
            return { test:'test'};
          }, //insert block data
        }
      );
    this
      .plugins = [dndPlugin];
    this.blockRenderMap = DefaultDraftBlockRenderMap.merge(
      this.customBlockRendering(props)
    );
    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
    this.blockRendererFn =this.blockRendererFn.bind(this);
  }

// shouldComponentUpdate(props, state) {
//   if (this.suppress) return false;
//   if (this.props.value !== props.value && props.value !== this.__raw) {
//     this.__raw = props.value;
//     this.setState({
//       editorState: !props.value
//         ? EditorState.createEmpty()
//         : EditorState.push(this.state.editorState, convertFromRaw(props.value))
//     });
//     return false;
//   }
//   else if (this.state.active !== state.active
//     || this.state.editorState !== state.editorState
//     || this.state.readOnly !== state.readOnly
//     || this.props.readOnly !== props.readOnly
//     || this.props.fileDrag !== props.fileDrag
//     || this.props.uploading !== props.uploading
//     || this.props.percent !== props.percent
//     || this.force) {
//     this.force = false;
//     return true;
//   }
//   return false;
// }
  customBlockRendering (props)  {
    const { blockTypes } = props;
    var newObj = {
      '0': {
        element: 'div',
      },
    };
debugger;
    return Map(newObj);
  }
  onChange(editorState) {
    // const force = false;
    // if (this.suppress && !force) return;
    console.log(editorState);
    console.log(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
    // if (this.props.onChange) {
    //   this.__raw = convertToRaw(editorState.getCurrentContent());
    //   this.props.onChange(this.__raw, editorState);
    // }
  }

  focus() {
    this.refs.editor.focus();
  }

blockRendererFn(contentBlock)  {

  const { blockTypes } = this.props;
  const type = contentBlock.getType();

  return undefined;
}

  render() {
    const { editorState } = this.state;
    const { readOnly } = this.props;
    return (
      <div className={style.container} onClick={this.focus}>
        <Editor
          readOnly={readOnly}
          editorState={editorState}
          plugins={this.plugins}
          onChange={this.onChange}
          blockRendererFn={this.blockRendererFn}
          ref="editor"
        />

      </div>
    );
  }
}
KeyPathEditor.propTypes = {};
export default KeyPathEditor
