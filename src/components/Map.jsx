import React, { useContext, useEffect, useRef } from "react";
import AppContext from "context";
import { TileLayer, Polygon, Popup } from "react-leaflet";
import {
  reduceCommunityData,
  resolveAreaStatusColor,
  getHeatmapDataFromFeatures,
  calculatePolygonCenter,
} from "utils";
import { DEFAULT_COMMUNITY_VALUE } from "config/constant";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import FullscreenControl from "react-leaflet-fullscreen";
import { ACTIONS } from "context/actionCreator";
import { CovidMap as CovMap } from "./styled";

const DEFAULT_COORDINATES = [13.7563, 100.5018];

const CommunityPolygon = (props) => {
  const { feature, key, map, dispatch } = props;
  var { leafletElement } = map.current;
  const { properties } = feature;
  const { data, name, type } = properties;
  const reducedData = properties.data
    ? reduceCommunityData(properties.data)
    : {};
  const { population, infected, died } = reducedData;
  const color = resolveAreaStatusColor(reducedData);

  const positions = feature.geometry.coordinates[0].map(([lon, lat]) => [
    lat,
    lon,
  ]);
  return (
    <Polygon
      onclick={(e) => {
        dispatch({ type: ACTIONS.SET_SELECTED_COMMUNITY, payload: name });
        const {
          target: {
            options: { positions },
          },
        } = e;
        leafletElement.flyToBounds(positions);
      }}
      positions={positions}
      key={key}
      fillColor={color}
      weight={2}
      opacity={1}
      fillOpacity={0.8}
    >
      <Popup>
        <div>
          <b>
            {name} ({type})
          </b>
        </div>
        {data ? (
          <>
            <div>ประชากร: {population}</div>
            <div>ติดเชื้อสะสม: {infected}</div>
            <div>เสียชีวิตสะสม: {died}</div>
          </>
        ) : (
          <b>ไม่พบข้อมูล</b>
        )}
      </Popup>
    </Polygon>
  );
};

const CovidMap = (props) => {
  const mapRef = useRef({});
  const bounds = useRef([]);
  const idBoundsMap = useRef({});
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { communityFeatures, selectedCommunity } = state;

  const setCommunitiesBounds = () => {
    const { leafletElement: map } = mapRef.current;
    const features = communityFeatures.features
      ? communityFeatures.features
      : [];
    bounds.current = [];
    idBoundsMap.current = {};
    features.map((f) => {
      const {
        geometry: { coordinates },
        properties,
      } = f;
      const { id } = properties;
      const len = coordinates[0].length;
      const [lat, lng] = calculatePolygonCenter(coordinates[0]);
      bounds.current.push([lat, lng]);
      idBoundsMap.current[id] = coordinates[0];
    });
    selectedCommunity === DEFAULT_COMMUNITY_VALUE &&
      bounds.current.length > 0 &&
      map.flyToBounds(bounds.current);
  };

  useEffect(() => {
    setCommunitiesBounds();
  }, [communityFeatures, selectedCommunity]);

  const features = communityFeatures.features ? communityFeatures.features : [];
  const heatmapData = getHeatmapDataFromFeatures(features);
  console.log({ heatmapData });
  return (
    <CovMap
      center={DEFAULT_COORDINATES}
      onclick={() => {
        dispatch({
          type: ACTIONS.SET_SELECTED_COMMUNITY,
          payload: DEFAULT_COMMUNITY_VALUE,
        });
        const { leafletElement: map } = mapRef.current;
        map.flyToBounds(bounds.current);
      }}
      ref={mapRef}
    >
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={heatmapData}
        longitudeExtractor={(m) => m[1]}
        latitudeExtractor={(m) => m[0]}
        intensityExtractor={(m) => parseFloat(m[2] * 100)}
      />
      <TileLayer
        // attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS,
        // AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User
        // Community"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      {features.map((f, i) => {
        return (
          <CommunityPolygon
            feature={f}
            map={mapRef}
            dispatch={dispatch}
            key={`community-polygon-${i}`}
          />
        );
      })}
      <FullscreenControl position="topright" />
    </CovMap>
  );
};

export default CovidMap;
