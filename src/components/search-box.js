import React from 'react';

import styles from './search-box.module.css';

class SearchBox extends React.Component {

  render() {

    return (

      <div className={styles.container}>

        <input
          placeholder="Search.."
          value={this.props.change}
          onChange={e => this.props.onChange(e.target.value)}
        />
      </div>
    );
  }
}

export default SearchBox;
