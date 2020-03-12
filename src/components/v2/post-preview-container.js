import React from 'react';

import styles from './post-preview-container.module.css';

import PostPreview from './post-preview';

const gridTemplateAreas = `

  '0 0 0 1 1 2'
  '0 0 0 1 1 2'
  '0 0 0 3 3 3'
  '4 5 5 3 3 3'
  '4 5 5 3 3 3'
`;

const gridTemplateRowsRest = [
  0, 3, 3, 3, 5, 5
];

const gridTemplateStep = 6;

class PostPreviewContainer extends React.Component {

  getStyle() {

 
    let template = '';

    for (let i = 0; i < this.props.ids.length; i += gridTemplateStep) {

      let t = gridTemplateAreas;

      for (let j = 0; j < gridTemplateStep; j++) {

        let r = new RegExp(j.toString(), 'g');

        t = t.replace(r, `p${i + j}`);
      }

      template += t;
    }
    
    const rows = parseInt(this.props.ids.length / 6) * 5 +
            gridTemplateRowsRest[this.props.ids.length % 6];

    console.log(template);

    return {

      gridTemplateRows: `repeat(${rows}, 10rem)`,
      gridTemplateAreas: template,
    };
  }

  render() {

    const { ids } = this.props;


    return (
      <div className={styles.container} style={this.getStyle()}>
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
