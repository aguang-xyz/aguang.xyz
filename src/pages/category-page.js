import React from 'react';
import Axios from 'axios';
import Yaml from 'js-yaml';

import Header from '../components/header';
import PostPreviewContainer from '../components/post-preview-container';

const posts = Axios.create({

  baseURL: 'posts',
});

class CategoryPage extends React.Component {

  state = {

    title: '',
    posts: [],
  };

  loadContent(props) {
    
    let { category } = props.match.params;

    posts.get(category ? `${category}/index.yaml` : 'index.yaml')
      .then(ret => {

        if (ret.status !== 200) {

          throw new Error('Failed to load');
        }

        const { title, posts } = Yaml.safeLoad(ret.data);

        this.setState({ title, posts });
      })
      .catch(e => {

        this.setState({
          title: '',
          posts: [],
        });
      });
  }

  componentDidMount() {

    this.loadContent(this.props);
  }


  render() {

    return (
      <div>
        <Header />

        <PostPreviewContainer
          posts={this.state.posts}
        />
      </div>
    );
  }
}

export default CategoryPage;
