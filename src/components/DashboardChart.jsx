import { Line } from "react-chartjs-2";
import { formatCommunityDataForInfectionChart } from "utils/chart";

const options = {
  scales: {
    y: {
      min: 0,
      beginAtZero: true,
    },
  },
};

const DashboardChart = ({ data, startDate, endDate }) => {

  const { labels, datasets } = formatCommunityDataForInfectionChart(data, { startDate, endDate })
  let datasets2 = datasets.map((d, i) => {
    return i - 1 >= 0 ? d - datasets[i - 1] : 0
  })
  let chartData = {
    labels,
    datasets: [
      {
        label: "ผู้ติดเชื้อสะสม",
        data: datasets,
        backgroundColor: "red",
        borderColor: "red",
      },
      {
        label: "ผู้ติดเชื้อรายวัน",
        data: datasets2,
        backgroundColor: "orange",
        borderColor: "orange",
      },
    ],
  };
  return (
    <>
      < Line data={chartData} options={options} />
      {/* < Line data={chartData2} options={options} /> */}
    </>
  )
};

export default DashboardChart;
