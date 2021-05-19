import React, { useContext, useState, useEffect, useRef } from "react";
import AppContext from "context";
import { Map, TileLayer, Polygon, Popup } from "react-leaflet";
import { reduceCommunityData, resolveAreaStatusColor } from "utils";
import { DEFAULT_COMMUNITY_VALUE } from "config/constant";
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
      onclick={() =>
        dispatch({ type: ACTIONS.SET_SELECTED_COMMUNITY, payload: name })
      }
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
      const centerLon = coordinates[0].reduce((a, b) => a + b[0], 0) / len;
      const centerLat = coordinates[0].reduce((a, b) => a + b[1], 0) / len;
      bounds.current.push([centerLat, centerLon]);
      idBoundsMap.current[id] = coordinates[0];
    });
    bounds.current.length > 0 && map.flyToBounds(bounds.current);
  };

  useEffect(() => {
    setCommunitiesBounds();
  }, [communityFeatures, selectedCommunity]);

  const features = communityFeatures.features ? communityFeatures.features : [];
  return (
    <CovMap
      center={DEFAULT_COORDINATES}
      onclick={() => {
        const { leafletElement: map } = mapRef.current;
        map.flyToBounds(bounds.current);
      }}
      zoom={13}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
    </CovMap>
  );
};

export default CovidMap;
