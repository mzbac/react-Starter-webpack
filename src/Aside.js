import React, { PropTypes } from 'react';
import style from './Aside.css';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

export const Aside = props => {
  const {} = props;

  return (
    <aside className={style.aside} >
      <List selectable ripple >
        {[...Array(8).keys()].map(key => {
          const startDrag = (e) => {
            e.dataTransfer.setData('text', `DRAFTJS_BLOCK_TYPE:${key}`);
          }
          return (
            <div key={key} className={style.item} draggable="true" onDragStart={startDrag} style={{cursor: "move"}}>
             component: {key}
            </div>
          );
        })}
      </List>
    </aside>
  );
}

Aside.propTypes = {};
export default Aside;
