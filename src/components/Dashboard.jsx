import { useContext, useMemo } from "react";
import AppContext from "context";
import { DashboardTitle, ContentCard } from "./styled";
import { DEFAULT_COMMUNITY_VALUE } from "config/constant";
import { isCommunityDataEmpty, reduceCommunityData } from "utils";
import { Layout, Card } from "antd";
import DashboardCard from "./DashboardCard";
import DashboardChart from "./DashboardChart";
import DashboardHeader from "./DashboardHeader";
const { Content } = Layout;

const Dashboard = () => {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { selectedCommunity, communityFeatures, dataLoading } = state;
  let features = communityFeatures.features ? communityFeatures.features : [];
  let currentFeatures =
    selectedCommunity !== DEFAULT_COMMUNITY_VALUE
      ? features.filter(
          ({ properties: { name } }) => name === selectedCommunity
        )
      : features;
  let data = currentFeatures.map(({ properties: { data } }) =>
    data ? reduceCommunityData(data) : null
  );
  let chartData = currentFeatures
    .map(({ properties: { data } }) => data)
    .filter((d) => d !== null);
  const isDataEmpty = isCommunityDataEmpty(data);

  // use memo to memorize the component so it will rerender every dependencies change
  const DashboardContent = useMemo(
    () => (
      <>
        <DashboardCard data={data} />
        <DashboardChart data={chartData} />
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
