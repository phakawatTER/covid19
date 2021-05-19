import Map from "./Map";
import Dashboard from "./Dashboard";
import CommunityDropdown from "./CommunityDropdown";
import { Row, Col, Layout, Menu } from "antd";
import { MainHeader } from "components/styled";
import moment from "moment";

const { Content } = Layout;

const MainPanel = () => {
  return (
    <Layout className="layout">
      <MainHeader style={{ backgroundColor: "black" }}>Covid 19</MainHeader>
      <Content>
        <Row>
          <Col xs={24} md={12}>
            <CommunityDropdown />
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
