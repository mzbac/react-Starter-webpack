import React, { Component, PropTypes } from 'react';
import { EditorState, convertToRaw, DefaultDraftBlockRenderMap, Entity, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createDndPlugin from 'draft-js-dnd-plugin';
import createCleanupEmptyPlugin from 'draft-js-cleanup-empty-plugin';
import createEntityPropsPlugin from 'draft-js-entity-props-plugin';
import createToolbarPlugin from './draft-js-toolbar-plugin/src';
import { Map } from 'immutable';
import Dialog from 'react-toolbox/lib/dialog';
import DraftEditorBlock from 'draft-js/lib/DraftEditorBlock.react';
import  style from './Editor.css';
import toolBarLinkAction from './toolBarLinkAction';
import Input from 'react-toolbox/lib/input';
import TestComponent from './CustomComponent';
import { Button, IconButton } from 'react-toolbox/lib/button';

class KeyPathEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.value
        ? EditorState.push(EditorState.createEmpty(), convertFromRaw(props.value))
        : EditorState.createEmpty(),
      draggingOver: false,
      dialogActive: false,
      dialogUrl: '',
      readOnly: false,
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
      types: [...Array(7).keys()].map((item) => `${item}`)
    });
    this
      .plugins = [dndPlugin, cleanupPlugin, createToolbarPlugin({
      theme: style, inlineStyles: [{
        label: 'Bold',
        button: <b>B</b>,
        style: 'BOLD'
      },
        { label: 'Italic', button: <i>I</i>, style: 'ITALIC' },
      ],
      clearTextActions: true,
      textActions: [
        toolBarLinkAction.CreateLinkAction(() => {
          return new Promise((resolve, reject) => {
            this.refs.editor.blur();
            this.setState({ dialogActive: !this.state.dialogActive });
            this.handleDalogSave = () => {
              resolve(this.state.dialogUrl);
              this.setState({ dialogActive: !this.state.dialogActive });
            }
          });
        }),
        {
          button: <span>H1</span>,
          label: 'h1',
          active: (block, editorState) => block.get('type') === 'header-one',
          toggle: (block, action, editorState, setEditorState) => {
            setEditorState(RichUtils.toggleBlockType(
              editorState,
              'header-one'
            ))
          },
        },
        {
          button: <span>H2</span>,
          label: 'h2',
          active: (block, editorState) => block.get('type') === 'header-two',
          toggle: (block, action, editorState, setEditorState) => setEditorState(RichUtils.toggleBlockType(
            editorState,
            'header-two'
          )),
        },
        {
          button: <span>H3</span>,
          label: 'h3',
          active: (block, editorState) => block.get('type') === 'header-three',
          toggle: (block, action, editorState, setEditorState) => setEditorState(RichUtils.toggleBlockType(
            editorState,
            'header-three'
          )),
        },
        {
          button: <span>H4</span>,
          label: 'h4',
          active: (block, editorState) => block.get('type') === 'header-four',
          toggle: (block, action, editorState, setEditorState) => setEditorState(RichUtils.toggleBlockType(
            editorState,
            'header-four'
          )),
        },
        {
          button: <span>H5</span>,
          label: 'h5',
          active: (block, editorState) => block.get('type') === 'header-five',
          toggle: (block, action, editorState, setEditorState) => setEditorState(RichUtils.toggleBlockType(
            editorState,
            'header-five'
          )),
        },
        {
          button: <span>C</span>,
          label: 'Code Block',
          active: (block, editorState) => block.get('type') === 'code-block',
          toggle: (block, action, editorState, setEditorState) => setEditorState(RichUtils.toggleBlockType(
            editorState,
            'code-block'
          )),
        },
        {
          button: <span>UL</span>,
          label: 'Unordered List',
          active: (block, editorState) => block.get('type') === 'unordered-list-item',
          toggle: (block, action, editorState, setEditorState) => setEditorState(RichUtils.toggleBlockType(
            editorState,
            'unordered-list-item'
          )),
        },
        {
          button: <span>OL</span>,
          label: 'Ordered List',
          active: (block, editorState) => block.get('type') === 'ordered-list-item',
          toggle: (block, action, editorState, setEditorState) => setEditorState(RichUtils.toggleBlockType(
            editorState,
            'ordered-list-item'
          )),
        },
        {
          button: <span>Q</span>,
          label: 'blockquote',
          active: (block, editorState) => block.get('type') === 'blockquote',
          toggle: (block, action, editorState, setEditorState) => setEditorState(RichUtils.toggleBlockType(
            editorState,
            'blockquote'
          )),
        },
      ]
    }), createEntityPropsPlugin({})]
    ;
    this.blockRenderMap = DefaultDraftBlockRenderMap.merge(
      this.customBlockRendering(props)
    );
    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
    this.blockRendererFn = this.blockRendererFn.bind(this);
  }

// shouldComponentUpdate(props, state) {
//   debugger;
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
    const selection = editorState.getSelection();

    if (selection) {
      console.log(editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType());
      const start = selection.getStartOffset();
      const end = selection.getEndOffset();
      console.log(`start ${start} end ${end}`);
    }
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
        component: TestComponent
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

  handleDalogToggle = () => {
    this.setState({ dialogActive: !this.state.dialogActive });
  }
  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    const { editorState, readOnly } = this.state;

    const actions = [
      { label: "Cancel", onClick: this.handleDalogToggle },
      { label: "Save", onClick: this.handleDalogSave }
    ];

    return (
      <div className={style.container} onClick={this.focus}>
        <Button style={{ marginLeft: '2rem' }} label={readOnly ? 'enable editing' : 'disable editing'} flat primary
                onClick={ () => {
                  this.setState({ readOnly: !this.state.readOnly });
                }
                }/>
        <Dialog
          actions={actions}
          active={this.state.dialogActive}
          onEscKeyDown={this.handleDalogToggle}
          onOverlayClick={this.handleDalogToggle}
          title='Please enter URL'
        >
          <Input type='text' label='URL' name='url' value={this.state.dialogUrl}
                 onChange={this.handleChange.bind(this, 'dialogUrl')}/>
        </Dialog>
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
