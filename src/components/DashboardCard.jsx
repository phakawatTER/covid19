import { InfoCard, InfoGridCard } from "./styled";
import { reduceCommunityData } from "utils";

const DashboardCard = ({ data }) => {
  const totalCommunity = data.length
  data = data.filter((d) => d !== null);
  const totalValidCommunity = data.length
  const dataNotFoundCommunity = totalCommunity - totalValidCommunity
  const accData = reduceCommunityData(data, { reduceCommunity: true });
  const {
    infected,
    infectedAtHospital,
    died,
    recovered,
    risk,
    riskTested,
    riskUntest,
    undetected,
    undetectedMultipleTime,
    infectedAtHome,
    population,
    normal,
  } = accData;
  return (
    <>
      <InfoCard>
        <InfoGridCard hoverable={false} backgroundColor={"red"}>
          <b className={"info-title"}>ผู้ป่วยสะสม</b>
          <br />
          <b className={"info-count"}>{infected}</b>
          <br />
          <b className={"info-title"}>คน</b>
          <div>อยู่โรงพยาบาล {infectedAtHospital} คน</div>
          <div>รักษาหายแล้ว {recovered} คน</div>
          <div>เสียชีวิต {died} คน</div>
        </InfoGridCard>
        <InfoGridCard hoverable={false} backgroundColor={"orange"}>
          <b className={"info-title"}>กลุ่มเสี่ยง</b>
          <br />
          <b className={"info-count"}>{risk}</b>
          <br />
          <b className={"info-title"}>คน</b>
          <div>รอผล {riskTested} คน</div>
        </InfoGridCard>
        <InfoGridCard hoverable={false} backgroundColor={"green"}>
          <b className={"info-title"}>ไม่พบเชื้อ</b>
          <br />
          <b className={"info-count"}>{undetected}</b>
          <br />
          <b className={"info-title"}>คน</b>
          <div>ตรวจเกินหนึ่งรอบ {undetectedMultipleTime} คน</div>
        </InfoGridCard>
      </InfoCard>

      {/* footer  */}
      <InfoCard>
        <InfoGridCard hoverable={false} backgroundColor={"#b20808"}>
          <div>
            <b className={"info-title"}>รอส่งตัว (อยู่บ้าน)</b>
          </div>
          <div>
            <b className={"info-title"}>{infectedAtHome}</b>
          </div>
        </InfoGridCard>
        <InfoGridCard hoverable={false} backgroundColor={"#d66a05"}>
          <div>
            <b className={"info-title"}>รอตรวจ</b>
          </div>
          <div>
            <b className={"info-title"}>{riskUntest}</b>
          </div>
        </InfoGridCard>
        <InfoGridCard
          hoverable={false}
          backgroundColor={"#dddddd"}
          color={"#000"}
        >
          <div>
            <b className={"info-title"}>ทั้งหมด ({totalCommunity}) ชุมชน</b>
          </div>
          <div>
            <b className={"info-title"}>ประชากร ({totalValidCommunity}) ชุมชน</b>
          </div>
          <div>
            <b className={"info-title"}>{population} คน</b>
          </div>
          {dataNotFoundCommunity > 0 && (
            <div>
              <b className={"info-title"}>ไม่พบข้อมูล ({dataNotFoundCommunity}) ชุมชน</b>
            </div>
          )}

        </InfoGridCard>
      </InfoCard>
    </>
  );
};
export default DashboardCard;
