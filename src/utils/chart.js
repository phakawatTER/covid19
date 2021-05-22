import moment from "moment";

export const formatCommunityDataForChart = (data, { startDate, endDate, key }) => {
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
      let targetData = currentData ? currentData[key] : communityMap[name]
      communityMap[name] = targetData
      dateMap[date] = dateMap[date] ? dateMap[date] + targetData : targetData
    })
  })
  const labels = Object.keys(dateMap).sort()
  const datasets = labels.map(date => dateMap[date])
  return { labels, datasets }
};
