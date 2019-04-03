import React from "react";
import { Bar } from "react-chartjs-2";

const formatNumber = value =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const Chart = ({ chartData, year }) => {
  return (
    <div className="chart">
      <Bar
        data={chartData}
        options={{
          title: {
            display: true,
            text: `Tổng doanh thu theo từng tháng năm ${year}`,
            fontSize: 25
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(value, index, values) {
                    return formatNumber(value) + " VNĐ";
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return (
                  "Doanh thu: " + formatNumber(tooltipItem.yLabel) + " VNĐ"
                );
              }
            }
          }
        }}
      />
    </div>
  );
};

export default Chart;
