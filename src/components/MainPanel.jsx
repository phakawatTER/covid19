import Map from "./Map";
import Dashboard from "./Dashboard";
import CommunityDropdown from "./CommunityDropdown";
import { Row, Col, Layout } from "antd";
import { MainHeader } from "components/styled";

const { Content } = Layout;

const MainPanel = () => {
  return (
    <Layout className="layout">
      <MainHeader style={{ backgroundColor: "black" }}>Covid 19</MainHeader>
      <Content>
        <CommunityDropdown />
        <Row>
          <Col xs={24} md={12}>
            <Map />
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
