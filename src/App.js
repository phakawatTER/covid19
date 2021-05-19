import { useReducer, useEffect } from "react";
import AppContext from "context";
import MainPanel from "components/MainPanel";
import { reducer, ACTIONS, INITITAL_STATE } from "context/actionCreator.js";
import "react-leaflet-fullscreen/dist/styles.css";
import "antd/dist/antd.compact.css";
import "leaflet/dist/leaflet.css";
import "./index.css";
import "react-resizable/css/styles.css";

function App() {
  const [state, dispatch] = useReducer(reducer, INITITAL_STATE);
  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_COMMUNITIES, dispatch });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <MainPanel />
    </AppContext.Provider>
  );
}

export default App;
