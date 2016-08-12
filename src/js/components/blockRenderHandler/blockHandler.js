import { Entity } from 'draft-js';
import React from 'react';

export default function blockRenderHandle(block) {
  const type = Entity
   .get(block.getEntityAt(0))
   .getData().type;
  if (type === 'test') {
    return {
      component: () => <div>aaa</div>,
      editable: false,
      props: {
        onStartEdit: (blockKey) => {
          const { liveTeXEdits } = this.state;
          this.setState({ liveTeXEdits: liveTeXEdits.set(blockKey, true) });
        },
        onFinishEdit: (blockKey) => {
          const { liveTeXEdits } = this.state;
          this.setState({ liveTeXEdits: liveTeXEdits.remove(blockKey) });
        },
        onRemove: (blockKey) => this._removeTeX(blockKey),
      },
    };
  }
  return null;
}
