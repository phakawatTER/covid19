import { useContext, useMemo } from "react";
import AppContext from "context";
import { DashboardTitle, InfoCard, InfoGridCard } from "./styled";
import { DEFAULT_COMMUNITY_VALUE } from "config/constant";
import { isCommunityDataEmpty, reduceCommunityData } from "utils";
import { Layout } from "antd";
import DashboardCard from "./DashboardCard";
import DashboardChart from "./DashboardChart";
const { Content } = Layout;

const Dashboard = () => {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { selectedCommunity, communityFeatures } = state;
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
    <>
      <Content style={{ marginLeft: 5, width: "100%", height: "100%" }}>
        <DashboardTitle>
          <b>
            {selectedCommunity === DEFAULT_COMMUNITY_VALUE
              ? "ทั้งหมด"
              : selectedCommunity}
          </b>
        </DashboardTitle>
        {isDataEmpty ? (
          <DashboardTitle>ไม่พบข้อมูล</DashboardTitle>
        ) : (
          DashboardContent
        )}
      </Content>
    </>
  );
};

export default Dashboard;
