import React from "react";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

import { getComments } from "./comments-api";
import Comment from "./comment.js";

import styles from "./comments-list.module.css";

class CommentsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      pageCount: 0,
      pageSize: 10,
      total: 0,
      entities: [],
      order: "recent",
    };
  }

  async fetchComments(_page = 1, _pageSize = 10, _order = "recent") {
    const { currentPage, pageCount, pageSize, total, entities } = (
      await getComments({
        category: this.props.category,
        page: _page,
        pageSize: _pageSize,
        order: _order,
      })
    ).data;

    this.setState({
      currentPage,
      pageCount,
      pageSize,
      total,
      entities,
      order: _order,
    });
  }

  refresh() {
    this.fetchComments(1, this.state.pageSize, "recent");
  }

  componentDidMount() {
    this.fetchComments();
  }

  prevPage() {
    const { currentPage, pageSize, order } = this.state;

    if (currentPage > 1) {
      this.fetchComments(currentPage - 1, pageSize, order);
    }
  }

  nextPage() {
    const { currentPage, pageSize, pageCount, order } = this.state;

    if (currentPage < pageCount) {
      this.fetchComments(currentPage + 1, pageSize, order);
    }
  }

  render() {
    const { currentPage, pageCount } = this.state;

    return (
      this.state.total > 0 && (
        <div className={styles.container}>
          <div className={styles.navbar}>
            <span className={styles.title}>{this.state.total} comments.</span>
            <GoChevronLeft
              className={styles.link}
              data-show={currentPage > 1}
              onClick={() => this.prevPage()}
            />
            <span className={styles.pager}>
              {currentPage} / {pageCount}
            </span>
            <GoChevronRight
              className={styles.link}
              data-show={currentPage < pageCount}
              onClick={() => this.nextPage()}
            />
          </div>

          {this.state.entities.map((entity) => (
            <Comment key={entity.id} comment={entity} />
          ))}

          <div className={`${styles.navbar} ${styles.second}`}>
            <span className={styles.title}>{this.state.total} comments.</span>
            <GoChevronLeft
              className={styles.link}
              data-show={currentPage > 1}
              onClick={() => this.prevPage()}
            />
            <span className={styles.pager}>
              {currentPage} / {pageCount}
            </span>
            <GoChevronRight
              className={styles.link}
              data-show={currentPage < pageCount}
              onClick={() => this.nextPage()}
            />
          </div>
        </div>
      )
    );
  }
}

export default CommentsList;
