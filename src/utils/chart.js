import moment from "moment";
import { reduceCommunityData } from "utils";
export const formatCommunityChartData = (data, key) => {
  let dateMap = {};
  let __data = data.reduce((a, b) => [...a, ...b], []);
  __data.map((d) => {
    const date = moment(d.timestamp).format("L");
    dateMap[date] = dateMap[date] ? reduceCommunityData([dateMap[date], d]) : d;
  });
  const labels = Object.keys(dateMap).sort();
  const datasets = labels.map((d) => dateMap[d][key]);
  return { labels, datasets };
};
