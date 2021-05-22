import { useContext, useMemo } from "react";
import AppContext from "context";
import { DashboardTitle, ContentCard } from "./styled";
import { DEFAULT_COMMUNITY_VALUE } from "config/constant";
import { groupCommunityDataByDate, isCommunityDataEmpty, reduceCommunityData } from "utils";
import { Layout, Card } from "antd";
import DashboardCard from "./DashboardCard";
import DashboardChart from "./DashboardChart";
import DashboardHeader from "./DashboardHeader";
const { Content } = Layout;

const Dashboard = () => {
  const context = useContext(AppContext);
  const { state, } = context;
  const { selectedCommunity, communityFeatures, dataLoading, dateInterval } = state;
  const [startDate, endDate] = dateInterval
  let features = communityFeatures.features ? communityFeatures.features : [];
  let currentFeatures =
    selectedCommunity !== DEFAULT_COMMUNITY_VALUE
      ? features.filter(
        ({ properties: { name } }) => name === selectedCommunity
      )
      : features;
  let data = currentFeatures.map(({ properties: { data, name } }) => {
    if (data) {
      // reduce data / community
      const dateData = groupCommunityDataByDate(data)
      return dateData[dateData.length - 1]
      // return reduceCommunityData([dateData[dateData.length - 1]])
    }
    return null
  });
  let chartData = currentFeatures.filter(({ properties: { data } }) => data !== null)
  const isDataEmpty = isCommunityDataEmpty(data);

  // use memo to memorize the component so it will rerender every dependencies change
  const DashboardContent = useMemo(
    () => (
      <>
        <DashboardCard data={data} />
        <DashboardChart data={chartData} startDate={startDate} endDate={endDate} />
      </>
    ),
    [communityFeatures, selectedCommunity]
  );

  return (
    <ContentCard loading={dataLoading}>
      <Content style={{ marginLeft: 5, width: "100%", height: "100%" }}>
        <DashboardHeader />
        {isDataEmpty ? (
          <DashboardTitle>ไม่พบข้อมูล</DashboardTitle>
        ) : (
          DashboardContent
        )}
      </Content>
    </ContentCard>
  );
};

export default Dashboard;
