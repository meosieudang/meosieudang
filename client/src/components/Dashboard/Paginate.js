import React from "react";
import Pagination from "material-ui-flat-pagination";
import { Grid } from "@material-ui/core";
import PageDisplay from "./PageDisplay";

class Paginate extends React.Component {
  state = { offset: 0, page: 1, limit: 10 };

  handleClick(offset, page) {
    this.setState({ offset, page }, () =>
      this.props.getAllProject(this.state.limit, this.state.page)
    );
  }

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.props.getAllProject(this.state.limit)
    );

  render() {
    const { projects } = this.props;
    return (
      <Grid container>
        <PageDisplay
          limit={this.state.limit}
          handleChange={this.handleChange}
        />
        <Pagination
          limit={projects.limit}
          total={projects.totalDocs}
          offset={this.state.offset}
          size="large"
          onClick={(e, offset, page) => this.handleClick(offset, page)}
          style={{ textAlign: "center" }}
        />
      </Grid>
    );
  }
}

export default Paginate;
