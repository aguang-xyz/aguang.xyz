/* eslint-disable no-loop-func */
import React from 'react';

import styles from './post-preview-container.module.css';

import { cloneDeep } from 'lodash';

import PostPreview from './post-preview';

const gridModes = {

  mobile: [
    [0, 0],
    [1, 2],
    [1, 3],
    [4, 3],
  ],

  desktop: [
    [0, 0, 0, 1, 1, 2],
    [0, 0, 0, 1, 1, 2],
    [0, 0, 0, 3, 3, 3],
    [4, 5, 5, 3, 3, 3],
    [4, 5, 5, 3, 3, 3],
  ],
};

class PostPreviewContainer extends React.Component {

  state = {

    mode: this.getMode(),
  };

  getMode() {

    return window.innerWidth > 600 ? gridModes.desktop : gridModes.mobile;
  }

  componentDidMount() {

    this._resizeHandler = window.addEventListener('resize', () => {

      this.setState({
        mode: this.getMode(),
      });
    });
  }

  componentWillUnmount() {

    window.removeEventListener('resize', this._resizeHandler);
  }

  getStyleX(mode, ids) {

    const columns = mode[0].length;
    const rowsPerGroup = mode.length;
    const itemsPerGroup = mode.reduce((x, y) => Math.max(x, ...y), 0) + 1;

    console.log(`columns = ${columns}`);
    console.log(`rowsPerGroup = ${rowsPerGroup}`);
    console.log(`itemsPerGroup = ${itemsPerGroup}`);

    let areas = '';
    let rows = 0;

    for (let i = 0; i < ids.length; i += itemsPerGroup) {

      let matrix = cloneDeep(mode);

      for (let j = 0; j < itemsPerGroup && i + j < ids.length; j++) {

        matrix = matrix.map(row => row.map(x => x === j ? `p${i + j}` : x));
      }

      matrix.forEach(row => {
        
        if (row.reduce((x, y) => x || typeof y === 'string', false)) {

          areas += `'${row.join(' ')}'\n`;
          rows++;
        }
      });
    }

    console.log(areas);

    return {

      gridTemplateRows: `repeat(${rows}, 10rem)`,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateAreas: areas,
    }
  }

  render() {

    const { ids } = this.props;

    return (
      <div className={styles.container} style={this.getStyleX(this.state.mode, ids)}>
        {ids.map((id, i) => (
          
            <PostPreview
              key={id}
              id={id}
              style={{
                gridArea: `p${i}`,
              }}
            />
        ))}
      </div>
    );
  }
}

export default PostPreviewContainer;
