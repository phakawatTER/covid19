import { STATUS_COLOR } from "config/constant";
import moment from "moment"

export const findMaxPopulation = (data) => {
  let maxPop = 0
  data.forEach(({ population }) => {
    if (population > maxPop) maxPop = population
  })
  return maxPop
}

export const groupCommunityDataByDate = (data) => {
  let dataDateMap = {}
  data.map(d => {
    const { timestamp } = d
    const date = moment(timestamp).format("L")
    if (dataDateMap[date]) return
    dataDateMap[date] = d
  })
  return data = Object.keys(dataDateMap).sort().map(date => dataDateMap[date])
}

export const reduceCommunityData = (
  data,
  options = { reduceCommunity: false }
) => {
  const { reduceCommunity } = options;
  let reduced = data.reduce((a, b, i) => {
    if (i === 0) return b;
    a = {
      died: a.died + b.died,
      govInfected: a.govInfected + b.govInfected,
      infectedAtHome: a.infectedAtHome + b.infectedAtHome,
      infectedAtHomeCritical:
        a.infectedAtHomeCritical + b.infectedAtHomeCritical,
      infectedAtHospital: a.infectedAtHospital + b.infectedAtHospital,
      infected: a.infected + b.infected,
      noData: a.noData + b.noData,
      normal: b.normal,
      // sum population is flag is set
      ...(reduceCommunity
        ? {
          population: a.population + b.population,
          normal: a.normal + b.normal,
        }
        : {}),
      recovered: a.recovered + b.recovered,
      recoveredObserved: a.recoveredObserved + b.recoveredObserved,
      recoveredObserving: a.recoveredObserving + b.recoveredObserving,
      risk: a.risk + b.risk,
      riskTested: a.riskTested + b.riskTested,
      riskUntest: a.riskUntest + b.riskUntest,
      undetected: a.undetected + b.undetected,
      undetectedMultipleTime:
        a.undetectedMultipleTime + b.undetectedMultipleTime,
    };
    return a;
  }, {});
  let r = { ...data[0], ...reduced }
  r.population = reduceCommunity ? r.population : findMaxPopulation(data)
  return r
};

export const resolveAreaStatusColor = (data) => {
  if (data.died > 0) return STATUS_COLOR.DEATH;
  else if (data.infected > 0) return STATUS_COLOR.INFECTED;
  return STATUS_COLOR.NO_DATA;
};

export const isCommunityDataEmpty = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== null) return false;
  }
  return true;
};

export const calculatePolygonCenter = (points) => {
  const lng = points.reduce((a, b) => a + b[0], 0) / points.length;
  const lat = points.reduce((a, b) => a + b[1], 0) / points.length;
  return [lat, lng];
};

export const getHeatmapDataFromFeatures = (features, key = "infected") => {
  let validFeatures = features.filter((d) => d.properties.data !== null);
  return validFeatures.reduce((a, d) => {
    const {
      geometry: { coordinates },
      properties,
    } = d;
    const { data } = properties;
    const reducedData = reduceCommunityData(data);
    const coordinate = coordinates[0];
    return [
      ...a,
      ...coordinate.map(([lng, lat]) => [lat, lng, reducedData[key]]),
    ];
  }, []);
};
