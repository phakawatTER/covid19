import { DEFAULT_COMMUNITY_VALUE } from "config/constant";
import AppContext from "context";
import { ACTIONS } from "context/actionCreator";
import { useContext } from "react";
import { DashboardTitle } from "./styled";
import FeatherIcon from "feather-icons-react";

const DashboardHeader = () => {
  const context = useContext(AppContext);
  const { dispatch, state } = context;
  const { selectedCommunity } = state;
  const backToAll = () =>
    dispatch({
      type: ACTIONS.SET_SELECTED_COMMUNITY,
      payload: DEFAULT_COMMUNITY_VALUE,
    });
  const communitySelected = selectedCommunity !== DEFAULT_COMMUNITY_VALUE;
  return (
    <DashboardTitle
      {...(communitySelected && {
        onClick: backToAll,
        style: {
          cursor: "pointer",
          textDecoration: "underline",
        },
      })}
    >
      {!communitySelected ? (
        "ทั้งหมด"
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FeatherIcon stroke={"#000"} icon="chevron-left" />
          {selectedCommunity}
        </div>
      )}
    </DashboardTitle>
  );
};

export default DashboardHeader;
