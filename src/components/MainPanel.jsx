import Map from "./Map";
import Dashboard from "./Dashboard";
import CommunityDropdown from "./CommunityDropdown";
import { Row, Col, Layout } from "antd";
import { MainHeader } from "components/styled";
import { useContext, useMemo } from "react";
import AppContext from "context";

const { Content } = Layout;

const MainPanel = () => {
  const context = useContext(AppContext)
  const { state } = context
  const CovidMap = useMemo(() => (<Map />), [])

  return (
    <Layout className="layout">
      <MainHeader>covid 19</MainHeader>
      <Content>
        <CommunityDropdown />
        <Row>
          <Col xs={24} md={12}>
            {CovidMap}
          </Col>
          <Col xs={24} md={12}>
            <Dashboard />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MainPanel;
