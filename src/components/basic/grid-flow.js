import React from 'react';
import PropTypes from 'prop-types';

import { min, cloneDeep } from 'lodash';

import styles from './grid-flow.module.css';

const layout = {

  mobile: [

    [],                  // mobile(0)

    [                    // mobile(1)
      [0, 0],
    ],

    [                    // mobile(2)
      [0, 0],
      [1, 1],
      [1, 1],
    ],

    [                    // mobile(3)
      [0, 0],
      [1, 2],
      [1, 2],
    ],

    [                    // mobile(4)
      [0, 0],
      [1, 2],
      [1, 3],
      [1, 3],
    ],

    [                    // mobile(5)
      [0, 0],
      [1, 2],
      [1, 3],
      [4, 3],
    ],
  ],

  desktop: [

    [],                   // 0

    [                     // 1
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],

    [                     // 2
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1],
    ],

    [                     // 3
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 2, 2, 2],
      [0, 0, 0, 2, 2, 2],
    ],

    [                     // 4
      [0, 0, 0, 1, 1, 2],
      [0, 0, 0, 1, 1, 2],
      [0, 0, 0, 3, 3, 3],
      [0, 0, 0, 3, 3, 3],
    ],

    [                     // 5
      [0, 0, 0, 1, 1, 2],
      [0, 0, 0, 1, 1, 2],
      [0, 0, 0, 3, 3, 3],
      [4, 4, 4, 3, 3, 3],
      [4, 4, 4, 3, 3, 3],
    ],

    [                     // 6
      [0, 0, 0, 1, 1, 2],
      [0, 0, 0, 1, 1, 2],
      [0, 0, 0, 3, 3, 3],
      [4, 5, 5, 3, 3, 3],
      [4, 5, 5, 3, 3, 3],
    ],
  ]
};

class GridFlow extends React.Component {

  state = {

    layout: this.getLayout(),
  }

  getLayout() {

    return (window.innerWidth <= 600) ? layout.mobile : layout.desktop;
  }

  getColumns(layout) {

    return layout[1][0].length;
  }

  getMaxElements(layout) {

    return layout.length - 1;
  }

  getStyle() {

    const { layout } = this.state;
    
    const style = this.props.style ? this.props.style : {};
    
    const children = React.Children.toArray(this.props.children);

    const columns = this.getColumns(layout);

    let areas = '', rows = 0;

    for (let i = 0; i < children.length; ) {

      const numOfElements = min([children.length - i, this.getMaxElements(layout)]);

      cloneDeep(layout[numOfElements])
        .map(row => row.map(x => `p${x + i}`))
        .map(row => row.join(' '))
        .forEach(row => {

          rows++;
          areas += `'${row}'\n`;
        });

      i += numOfElements;
    }

    console.log(areas);

    return {

      gridTemplateRows: `repeat(${rows}, 10rem)`,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateAreas: areas,
      ...style,
    };
  }

  componentDidMount() {

    this._resizeHandler =
      window.addEventListener('resize', () => {

        this.setState({ layout: this.getLayout() });
      });
  }

  componentWillUnmount() {

    window.removeEventListener('resize', this._resizeHandler);
  }

  getClassName() {

    const classNames = [ styles.container ];

    if (this.props.className) {

      classNames.push(this.props.className);
    }

    return classNames.join(' ');
  }

  render() {

    return (
      
      <div className={this.getClassName()} style={this.getStyle()}>
        {React.Children.map(this.props.children, (child, i) => (

          <div key={i} style={{ gridArea: `p${i}` }}>
            {child}
          </div>
        ))}
      </div>
    );
  }
}

GridFlow.propTypes = {

  className: PropTypes.string,
  style: PropTypes.object,
};

export default GridFlow;
