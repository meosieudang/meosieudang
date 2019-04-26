import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Grid,
  Hidden
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ListDiagram = props => {
  if (Object.keys(props.detailProfile).length === 0)
    return <Redirect to="/dashboard" />;
  const data = props.detailProfile.seat.filter(item => item.isBook === true);
  const list = data.reduce((v, i) => {
    let findPhone = v.filter(item => item.phone === i.phoneUser)[0];

    findPhone === undefined
      ? v.push({
          name: i.nameUser,
          phone: i.phoneUser,
          seat: [i.nameSeat]
        })
      : findPhone.seat.push(i.nameSeat);
    return v;
  }, []);

  return (
    <>
      <div style={{ marginTop: "15vh", textAlign: "center" }}>
        <Typography variant="display1" gutterBottom>
          Danh Sách Số Điện Thoại Đã Đặt Vé
        </Typography>
        <Typography variant="headline" paragraph>
          Ngày: {props.detailProfile.profile.create_date}
        </Typography>
        <Typography variant="headline" paragraph>
          Tên chuyến:{" "}
          {`${props.detailProfile.start} - ${props.detailProfile.end}`}
        </Typography>
      </div>
      <Grid container justify="center">
        <Grid item xs={10} md={10} lg={10}>
          <Paper>
            <div style={{ overFlowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <Hidden mdDown>
                      <TableCell>Tên Khách</TableCell>
                    </Hidden>
                    <TableCell>SĐT</TableCell>
                    <TableCell>Tên Ghế</TableCell>
                    <TableCell>Thành Tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map(item => (
                    <TableRow key={item.phone} hover>
                      <Hidden mdDown>
                        <TableCell>{item.name}</TableCell>
                      </Hidden>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {item.phone}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {item.seat.join(", ")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          <NumberFormat
                            value={item.seat.length * props.detailProfile.price}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" VNĐ"}
                          />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <Hidden mdDown>
                      <TableCell />
                    </Hidden>
                    <TableCell />
                    <TableCell>Tổng tiền</TableCell>
                    <TableCell>
                      <Typography variant="h6" color="error">
                        <NumberFormat
                          value={data.length * props.detailProfile.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" VNĐ"}
                        />
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  detailProfile: state.project.detailProfile
});

export default connect(
  mapStateToProps,
  null
)(ListDiagram);
