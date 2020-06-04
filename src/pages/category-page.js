import React from 'react';
import Axios from 'axios';
import Yaml from 'js-yaml';

import Header from '../components/header';
import SearchBox from '../components/search-box';

import GridFlow from '../components/basic/grid-flow';

import PostPreview from '../components/post-preview';

const posts = Axios.create({
  baseURL: 'posts',
});

class CategoryPage extends React.Component {
  state = {
    title: '',
    posts: [],
    search: '',
  };

  loadContent(props) {
    let { category } = props.match.params;

    posts
      .get(category ? `${category}/index.yaml` : 'index.yaml')
      .then((ret) => {
        if (ret.status !== 200) {
          throw new Error('Failed to load');
        }

        const { title, posts } = Yaml.safeLoad(ret.data);

        this.setState({ title, posts });
      })
      .catch((e) => {
        this.setState({
          title: '',
          posts: [],
        });
      });
  }

  componentDidMount() {
    this.loadContent(this.props);
  }

  filteredPosts() {
    const { search, posts } = this.state;

    return posts.filter(
      (post) => post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1,
    );
  }

  render() {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#000' }}>
        <Header />

        <SearchBox
          value={this.state.search}
          onChange={(search) => {
            this.setState({ search });
          }}
        />

        <GridFlow>
          {this.filteredPosts().map((post, i) => (
            <PostPreview key={post.id} {...post} />
          ))}
        </GridFlow>
      </div>
    );
  }
}

export default CategoryPage;
