import { Line } from "react-chartjs-2";
import { formatCommunityDataForChart } from "utils/chart";
import { Col, Row } from "antd"

const options = {
  scales: {
    y: {
      min: 0,
      beginAtZero: true,
    },
  },
};

const DashboardChart = ({ data, startDate, endDate }) => {

  const { labels, datasets } = formatCommunityDataForChart(data, { startDate, endDate, key: "infected" })
  const { datasets: deathDatasets } = formatCommunityDataForChart(data, { startDate, endDate, key: "died" })
  let datasets2 = datasets.map((d, i) => {
    return i - 1 >= 0 ? d - datasets[i - 1] : 0
  })
  let chart1 = {
    labels,
    datasets: [
      {
        label: "ผู้ติดเชื้อสะสม",
        data: datasets,
        backgroundColor: "red",
        borderColor: "red",
      },
    ],
  };

  let chart2 = {
    labels,
    datasets: [
      {
        label: "ผู้ติดเชื้อรายวัน",
        data: datasets2,
        backgroundColor: "orange",
        borderColor: "orange",
      },
    ]
  }

  let chart3 = {
    labels,
    datasets: [
      {
        label: "ผู้เสียชีวิตสะสม",
        data: deathDatasets,
        backgroundColor: "red",
        borderColor: "red",
      },
    ]
  }

  return (
    <Row>
      <Col xs={24} style={{ padding: "1rem" }}>
        <h1>ผู้เสียชีวิตสะสม</h1>
        <Line data={chart2} options={options} />
      </Col>
      <Col xs={24} style={{ padding: "1rem" }}>
        <h1>ผู้ติดเชื้อสะสม</h1>
        <Line data={chart1} options={options} />
      </Col>
      <Col xs={24} style={{ padding: "1rem" }}>
        <h1>ผู้ติดเชื้อรายวัน</h1>
        <Line data={chart2} options={options} />
      </Col>
    </Row>
  )
};

export default DashboardChart;
