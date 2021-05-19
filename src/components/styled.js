import styled from "styled-components";
import { Layout, Card } from "antd";
import { Map } from "react-leaflet";
const { Header } = Layout;
export const MainHeader = styled(Header)`
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const DashboardHeader = styled(Header)`
  display: flex;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  align-items: center;
`;

export const DashboardTitle = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 1rem;
`;

export const InfoGridCard = styled.div`
  background-color: ${(props) => props.backgroundColor};
  text-align: center;
  color: ${({ color }) => (color ? color : "#fff")};
  background-color: ${(props) => props.backgroundColor};
  font-size: 0.8rem;
  flex-basis: 0;
  flex-grow: 1;
  padding: 1rem 1rem;
  .info-title {
    font-weight: bold;
    font-size: 1rem;
  }
  .info-count {
    font-size: 1.5rem;
  }
`;

export const InfoCard = styled.div`
  width: 100%;
  display: flex;
`;

export const CovidMap = styled(Map)`
  width: 100%;
  min-height: 100%;
  @media screen and (max-width: 768px) {
    height: 50vh;
  }
`;
