import { getCommunities } from "api/communities";
import { ACTIONS } from "./actionCreator";
export const fetchCommunities = async (state, dispatch, payload) => {
  try {
    const [response, err] = await getCommunities({ ...payload });
    if (err) throw err;
    const { data } = response;
    const collection = data[0];
    let { jsonb_build_object: features } = collection;
    dispatch({ type: ACTIONS.SET_DATA_LOADING, payload: false });
    let communityMap = {}
    features.features = features.features.filter(d => {
      const { properties: { name } } = d
      if (communityMap[name]) return false
      communityMap[name] = true
      return true
    })
    dispatch({ type: ACTIONS.SET_COMMUNITIES, payload: features });
  } catch (error) {
    console.log(error);
  }
};
