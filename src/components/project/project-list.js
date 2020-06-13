import Axios from "axios";
import Yaml from "js-yaml";
import React from "react";

import FeedButton from "../basic/feed-button";

import styles from "./project-list.module.css";

const posts = Axios.create({
  baseURL: "posts",
});

const DEFAULT_IMAGE =
  "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";

class ProjectItem extends React.Component {
  render() {
    const post = this.props.post;

    const image = post.image || DEFAULT_IMAGE;

    return (
      <div
        className={styles.ProjectItem}
        onClick={() => {
          window.open(post.link);
        }}
      >
        <img src={image} alt={post.title} />
        <div className={styles.Right}>
          <div className={styles.Title}>{post.title}</div>
          <div className={styles.Tags}>
            {post.badge &&
              post.badge.map((s) => (
                <img className={styles.Badge} src={s} alt={post.title} />
              ))}

            {post.stack && post.stack.map((s) => <strong>{s}</strong>)}
          </div>
          <div className={styles.Description}>{post.description}</div>
        </div>
      </div>
    );
  }
}

class ProjectList extends React.Component {
  state = {
    title: "",
    posts: [],
  };

  loadContent() {
    posts
      .get("projects/index.yaml")
      .then((ret) => {
        if (ret.status !== 200) {
          throw new Error("Failed to load");
        }

        const { title, posts } = Yaml.safeLoad(ret.data);

        this.setState({ title, posts });
      })
      .catch((e) => {
        this.setState({
          title: "",
          posts: [],
        });
      });
  }

  componentDidMount() {
    this.loadContent();
  }

  render() {
    return (
      <div className={styles.ProjectList}>
        {this.state.posts.map((post) => (
          <ProjectItem key={post.id} post={post} />
        ))}

        <FeedButton url="/posts/projects/index.rss" />
      </div>
    );
  }
}

export default ProjectList;
