import axios from "axios";

export const getCommunities = async ({ id, type, sdate, edate }) => {
  try {
    console.log(
      process.env.REACT_APP_AUTH_TOKEN,
      process.env.REACT_APP_USERNAME,
      process.env.REACT_APP_PASSWORD
    );
    const response = await axios.post(
      "http://covidmap.siitgis.com/api/v1/bbox_area",
      { id, type, sdate, edate },
      // {
      //   id: 0,
      //   type: 0,
      //   sdate: "2021-04-30 00:00:00",
      //   edate: "2021-05-16 00:00:00",
      // },
      {
        headers: {
          Authorization: process.env.REACT_APP_AUTH_TOKEN,
          auth: {
            username: process.env.REACT_APP_USERNAME,
            passowrd: process.env.REACT_APP_PASSWORD,
          },
        },
      }
    );
    const { data } = response;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
};
