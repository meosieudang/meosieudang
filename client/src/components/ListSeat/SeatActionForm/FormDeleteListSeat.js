import React from "react";
import { Paper, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteListSeat } from "../../../actions/platesAction";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const FormDeleteListSeat = ({ deleteListSeat, detailProfile }) => {
  const handleDelete = e => {
    e.preventDefault();
    swal({
      title: "Bạn có chắc chắn muốn xóa danh sách ghế này",
      text: "Sau khi xóa, dữ liệu danh sách ghế này sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Xóa thành công", {
          icon: "success"
        });
        const idPlates = {
          idPlates: detailProfile._id
        };
        deleteListSeat(idPlates);
      }
    });
  };
  return (
    <Paper style={{ marginTop: 20, textAlign: "center", padding: 10 }}>
      <form onSubmit={handleDelete}>
        <Button type="submit" variant="outlined" style={{ color: "#f44336" }}>
          Xóa Danh Sách Ghế
        </Button>
        <Button
          component={Link}
          to={`/diagram/${detailProfile._id}`}
          variant="contained"
          style={{ background: "#009688", color: "white", marginLeft: 15 }}
        >
          SƠ ĐỒ PHƠI XE
        </Button>
      </form>
    </Paper>
  );
};

export default connect(
  null,
  { deleteListSeat }
)(FormDeleteListSeat);
