import React from "react";
import { Paper, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteListSeat, modalContent } from "../../../actions/platesAction";

const FormDeleteListSeat = ({ deleteListSeat, detailProfile }) => {
  const handleDelete = e => {
    e.preventDefault();
    const idPlates = {
      idPlates: detailProfile._id
    };

    modalContent(
      "Bạn có chắc chắn muốn xóa danh sách ghế này",
      "Sau khi xóa, dữ liệu danh sách ghế này sẽ không thể khôi phục!"
    ).then(willDelete => {
      if (willDelete) {
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
      </form>
    </Paper>
  );
};

export default connect(
  null,
  { deleteListSeat }
)(React.memo(FormDeleteListSeat));
