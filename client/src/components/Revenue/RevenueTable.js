import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import NumberFormat from "react-number-format";

const RevenueTable = ({ revenue }) => {
  return (
    <Paper>
      <div style={{ overFlowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tháng</TableCell>
              <TableCell>Doanh thu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revenue
              ? revenue.map(item => (
                  <TableRow key={item.value}>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>
                      <NumberFormat
                        value={item.revenue}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" VNĐ"}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};
export default RevenueTable;
