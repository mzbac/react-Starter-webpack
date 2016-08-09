import React, { Component, PropTypes } from 'react';
import { EditorState, convertToRaw, DefaultDraftBlockRenderMap, Entity } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createDndPlugin from 'draft-js-dnd-plugin';
import createCleanupEmptyPlugin from 'draft-js-cleanup-empty-plugin';
import createToolbarPlugin from 'draft-js-toolbar-plugin';
import { Map } from 'immutable';
import DraftEditorBlock from 'draft-js/lib/DraftEditorBlock.react';
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
            return { test: 'test' };
          }, //insert block data
        }
      );
    const cleanupPlugin = createCleanupEmptyPlugin({
      types: [...Array(7).keys()].map( (item) => `${item}`)
    });
    this
      .plugins = [dndPlugin,cleanupPlugin];
    this.blockRenderMap = DefaultDraftBlockRenderMap.merge(
      this.customBlockRendering(props)
    );
    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
    this.blockRendererFn = this.blockRendererFn.bind(this);
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
  customBlockRendering(props) {
    const { blockTypes } = props;
    var newObj = {
      '0': {
        element: 'div',
      },
      '1': {
        element: 'div',
      },
      '2': {
        element: 'div',
      },
      '3': {
        element: 'div',
      },
      '4': {
        element: 'div',
      },
      '5': {
        element: 'div',
      },
      '6': {
        element: 'div',
      },
      '7': {
        element: 'div',
      },
    };

    return Map(newObj);
  }

  onChange(editorState) {
    // const force = false;
    // if (this.suppress && !force) return;
    this.setState({ editorState });
    // if (this.props.onChange) {
    //   this.__raw = convertToRaw(editorState.getCurrentContent());
    //   this.props.onChange(this.__raw, editorState);
    // }
  }

  focus() {
    this.refs.editor.focus();
  }

  blockRendererFn(contentBlock) {

    const { blockTypes } = this.props;
    const type = contentBlock.getType();
    if (type === '0') {
      return {
        component: (props) => {
          return <ol>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
          </ol>
        }
      }
    }

    if (type === '1') {
      return {
        component: (props) => {
          //fetch data
          let data = Entity.get(props.block.getEntityAt(0)).getData();
          //set new props on data
          data.netTest = 111;
          //data store in block data
          const data1 = Entity.get(props.block.getEntityAt(0)).getData();
          return <div>custom component {props.block.getType()}</div>
        }
      }
    }


    if (type === '2') {
      return {
        component: (props) => {
          //fetch data
          let data = Entity.get(props.block.getEntityAt(0)).getData();
          //set new props on data
          data.netTest = 111;
          //data store in block data
          const data1 = Entity.get(props.block.getEntityAt(0)).getData();
          return <div>custom component {props.block.getType()}</div>
        }
      }
    }


    if (type === '3') {
      return {
        component: (props) => {
          //fetch data
          let data = Entity.get(props.block.getEntityAt(0)).getData();
          //set new props on data
          data.netTest = 111;
          //data store in block data
          const data1 = Entity.get(props.block.getEntityAt(0)).getData();
          return <div>custom component {props.block.getType()}</div>
        }
      }
    }


    if (type === '4') {
      return {
        component: (props) => {
          //fetch data
          let data = Entity.get(props.block.getEntityAt(0)).getData();
          //set new props on data
          data.netTest = 111;
          //data store in block data
          const data1 = Entity.get(props.block.getEntityAt(0)).getData();
          return <div>custom component {props.block.getType()}</div>
        }
      }
    }



    if (type === '5') {
      return {
        component: (props) => {
          //fetch data
          let data = Entity.get(props.block.getEntityAt(0)).getData();
          //set new props on data
          data.netTest = 111;
          //data store in block data
          const data1 = Entity.get(props.block.getEntityAt(0)).getData();
          return <div>custom component {props.block.getType()}</div>
        }
      }
    }



    if (type === '6') {
      return {
        component: (props) => {
          //fetch data
          let data = Entity.get(props.block.getEntityAt(0)).getData();
          //set new props on data
          data.netTest = 111;
          //data store in block data
          const data1 = Entity.get(props.block.getEntityAt(0)).getData();
          return <div>custom component {props.block.getType()}</div>
        }
      }
    }


    if (type === '7') {
      return {
        component: (props) => {
          //fetch data
          let data = Entity.get(props.block.getEntityAt(0)).getData();
          //set new props on data
          data.netTest = 111;
          //data store in block data
          const data1 = Entity.get(props.block.getEntityAt(0)).getData();
          return <div>custom component {props.block.getType()}</div>
        }
      }
    }
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
          blockRenderMap={this.blockRenderMap}
          blockRendererFn={this.blockRendererFn}
          ref="editor"
        />

      </div>
    );
  }
}
KeyPathEditor.propTypes = {};
export default KeyPathEditor
