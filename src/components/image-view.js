import React from "react";

import styles from "./image-view.module.css";

const ImageView = (image) => (
  <div
    className={styles.container}
    style={{ backgroundImage: `url(${image.src})` }}
  ></div>
);

export default ImageView;
