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
  let dataTotal = data.reduce((a, b, i) => {
    if (i === 0) return [b];
    return [...a, b + a[i - 1]];
  }, []);
  console.log({ dataTotal });
  let chartData = {
    labels,
    datasets: [
      {
        label: "ผู้ติดเชื้อรายวัน",
        data,
        backgroundColor: "orange",
        borderColor: "orange",
      },
      {
        label: "ผู้ติดเชื้อสะสม",
        data: dataTotal,
        backgroundColor: "red",
        borderColor: "red",
      },
    ],
  };
  return <Line data={chartData} options={options} />;
};

export default DashboardChart;
