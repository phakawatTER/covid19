import moment from "moment";
import { reduceCommunityData, groupCommunityDataByDate } from "utils";

export const formatCommunityDataForInfectionChart = (data, { startDate, endDate }) => {
  const communityMap = {}
  const dateMap = {}
  // assign default values to the map
  data.map(({ properties: { name } }) => {
    communityMap[name] = 0
  })
  const dateDiff = Math.abs(startDate.diff(endDate, "days"))
  new Array(dateDiff).fill().map((_, i) => {
    const date = startDate.clone().add(i, "days").format("L")
    data.forEach(({ properties }) => {
      const { name, data } = properties
      let currentData = data.find(d => moment(d.timestamp).format("L") === date)
      let infected = currentData ? currentData.infected : communityMap[name]
      communityMap[name] = infected
      dateMap[date] = dateMap[date] ? dateMap[date] + infected : infected
    })
  })
  const labels = Object.keys(dateMap).sort()
  const datasets = labels.map(date => dateMap[date])
  return { labels, datasets }
};
