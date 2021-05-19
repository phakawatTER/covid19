import { useContext } from "react";
import { Select, Button, DatePicker, Row, Col } from "antd";
import AppContext from "context";
import { ACTIONS } from "context/actionCreator";
import { DEFAULT_COMMUNITY_VALUE } from "config/constant";
import { reduceCommunityData } from "utils";

const CommunityDropdown = () => {
  const context = useContext(AppContext);
  const { dispatch, state } = context;
  const {
    communityFeatures: { features },
    selectedCommunity,
    dateInterval,
    dataLoading,
  } = state;

  const data = features ? features.map(({ properties }) => properties) : [];
  return (
    <>
      <Row>
        <Col xs={12}>
          <h1>เลือกวันที่เริ่มต้น</h1>
          <DatePicker
            style={{ width: "100%" }}
            placeholder="เลือกวันที่"
            value={dateInterval[0]}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.SET_DATE_INTERVAL,
                payload: [e, dateInterval[1]],
              })
            }
          />
        </Col>
        <Col xs={12}>
          <h1>เลือกวันที่สิ้นสุด</h1>
          <DatePicker
            style={{ width: "100%" }}
            placeholder="เลือกวันที่"
            value={dateInterval[1]}
            onChange={(e) => {
              dispatch({
                type: ACTIONS.SET_DATE_INTERVAL,
                payload: [dateInterval[0], e],
              });
            }}
          />
        </Col>
      </Row>

      <Button
        type="primary"
        onClick={() => dispatch({ type: ACTIONS.FETCH_COMMUNITIES, dispatch })}
        loading={dataLoading}
      >
        ค้นหา
      </Button>
      <h1>เลือกชุมชน</h1>
      <Select
        defaultValue={DEFAULT_COMMUNITY_VALUE}
        value={selectedCommunity}
        style={{ width: "100%" }}
        placeholder={"เลือกชุมชน"}
        onSelect={(e) =>
          dispatch({ type: ACTIONS.SET_SELECTED_COMMUNITY, payload: e })
        }
      >
        <Select.Option
          key={"community-option-0"}
          value={DEFAULT_COMMUNITY_VALUE}
        >
          รวมทั้งหมด
        </Select.Option>
        {data.map((d, i) => {
          const { name, id, data } = d;
          const reducedData = data ? reduceCommunityData(data) : {};
          const { died, infected } = reducedData;
          return (
            <Select.Option key={`community-option${i + 1}`} value={name}>
              {name} {data && `(เสียชีวิต:${died} ติดเชื้อ:${infected})`}
            </Select.Option>
          );
        })}
      </Select>
    </>
  );
};
export default CommunityDropdown;
