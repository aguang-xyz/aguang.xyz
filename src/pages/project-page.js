import React from "react";

import Header from "../components/header";
import ProjectList from "../components/project/project-list";

class ProjectPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ProjectList />
      </div>
    );
  }
}

export default ProjectPage;
