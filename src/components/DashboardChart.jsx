import { memo } from "react";
import { Line } from "react-chartjs-2";
import { formatCommunityChartData } from "utils/chart";

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const DashboardChart = (props) => {
  let { labels, datasets: data } = formatCommunityChartData(
    props.data,
    "infected"
  );
  let chartData = {
    labels,
    datasets: [
      {
        label: "ผู้ติดเชื้อสะสม",
        data,
        backgroundColor: "red",
        borderColor: "red",
      },
    ],
  };
  return <Line data={chartData} options={options} />;
};

export default DashboardChart;
