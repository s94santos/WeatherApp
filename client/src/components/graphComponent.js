import React, { useState } from "react";
import ReactApexChart from 'react-apexcharts'

const BarChart = ({options, series}) => {

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height="350" />
    </div>
  )

}

export default BarChart;