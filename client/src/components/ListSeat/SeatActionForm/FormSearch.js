import React, { Component } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { searchPhoneUser } from "../../../actions/profileAction";

class FormSearch extends Component {
  state = {
    query: ""
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSearch = () => {
    this.props.searchPhoneUser(this.state.query);
  };

  render() {
    return (
      <Grid container justify="center" alignItems="center" spacing={16}>
        <Grid item>
          <TextField
            type="search"
            label="Tìm theo SĐT"
            name="query"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item>
          <Button onClick={this.handleSearch} variant="outlined">
            Search
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  searchPhone: state.project.searchPhone
});

export default connect(
  mapStateToProps,
  { searchPhoneUser }
)(FormSearch);
