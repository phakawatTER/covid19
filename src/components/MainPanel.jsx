import Map from "./Map";
import Dashboard from "./Dashboard";
import CommunityDropdown from "./CommunityDropdown";
import { Row, Col, Layout } from "antd";
import { MainHeader } from "components/styled";
import { useContext, useMemo } from "react";
import AppContext from "context";
import styled from "styled-components";

const { Content } = Layout;

const DashboardCol = styled(Col)`
  @media screen and (min-width: 768px) {
    overflow: scroll;
    max-height: 90vh;
  }
`

const MainPanel = () => {
  const context = useContext(AppContext)
  const { state } = context
  const CovidMap = useMemo(() => (<Map />), [])

  return (
    <Layout className="layout">
      <MainHeader>covid 19</MainHeader>
      <Content>
        <Row>
          <Col xs={24} md={12}>
            {CovidMap}
          </Col>
          <DashboardCol xs={24} md={12}>
            <CommunityDropdown />
            <Dashboard />
          </DashboardCol>
        </Row>
      </Content>
    </Layout>
  );
};

export default MainPanel;
