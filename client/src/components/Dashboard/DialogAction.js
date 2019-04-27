import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import StyledDatePicker from "../../StyledComponents/StyledDatePicker";
import moment from "moment";

class DialogAction extends Component {
  state = {
    create_date: new Date()
  };

  handleChangeDate = data => this.setState({ create_date: data });

  componentDidUpdate() {
    if (this.props.open) {
      if (this.props.isAuthenticated) {
        this.props.handleClose();
        this.setState({
          create_date: new Date()
        });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const newProject = {
      create_date: moment(this.state.create_date._d).format("DD/MM/YYYY")
    };
    this.props.addNewProject(newProject);
  };

  render() {
    const { open, handleClose, msgError } = this.props;
    const { create_date } = this.state;
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Chuyến Xe Mới</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: 15 }}>
            Vui lòng chọn ngày xuất phát
          </DialogContentText>
          <Typography
            variant="subtitle1"
            gutterBottom
            align="center"
            color="secondary"
          >
            {msgError.create_date ? msgError.create_date : null}
          </Typography>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item>
              <StyledDatePicker
                onChange={this.handleChangeDate}
                date={create_date}
                label="Date"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.onSubmit}>
            OK
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DialogAction;
