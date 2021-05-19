import { STATUS_COLOR } from "config/constant";

export const reduceCommunityData = (
  data,
  options = { shouldSumPopulation: false }
) => {
  const { shouldSumPopulation } = options;
  let reduced = data.reduce((a, b, i) => {
    if (i === 0) return b;
    a = {
      died: a.died + b.died,
      govInfected: a.govInfected + b.govInfected,
      infected: a.infected + b.infected,
      infectedAtHome: a.infectedAtHome + b.infectedAtHome,
      infectedAtHomeCritical:
        a.infectedAtHomeCritical + b.infectedAtHomeCritical,
      infectedAtHospital: a.infectedAtHospital + b.infectedAtHospital,
      noData: a.noData + b.noData,
      normal: b.normal,
      // sum population is flag is set
      ...(shouldSumPopulation
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
  return { ...data[0], ...reduced };
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
