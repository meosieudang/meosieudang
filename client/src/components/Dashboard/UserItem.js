import React from "react";
import { TableCell, Tooltip, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/profileAction";
import { Link } from "react-router-dom";

const UserItem = ({
  project,
  index,
  getUser,
  deleteProject,
  handleClickOpen
}) => {
  const handleDeleteProject = id => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dữ liệu này ?")) {
      deleteProject(id);
    }
  };
  return (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{project.handle}</TableCell>
      <TableCell style={{ fontSize: "1rem" }}>{project.create_date}</TableCell>
      <TableCell>
        {project.profile.map(item => (
          <Typography noWrap gutterBottom key={item.licensePlates}>
            {item.licensePlates}
          </Typography>
        ))}
      </TableCell>
      <TableCell>
        <Tooltip title="Xem chi tiết">
          <IconButton component={Link} to={`/dashboard/${project._id}`}>
            <Visibility />
          </IconButton>
        </Tooltip>

        <Tooltip title="Xóa">
          <IconButton onClick={() => handleDeleteProject(project._id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </>
  );
};

export default connect(
  null,
  { deleteProject }
)(UserItem);
