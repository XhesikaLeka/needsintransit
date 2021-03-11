import React, { useEffect, useState } from "react";
import { Marker, Popup, TileLayer, MapContainer, useMap, useMapEvent } from "react-leaflet";
import { MarkerIcon, marker } from '../Themes/Images'
import L from 'leaflet';

const MapContent = (
  {
    mapCenter,
    markers,
    markerIcon,
    editable,
    setPosition,
    setSuggestion,
    setLocationModal,
    setEditable,
    openDrawerAndSuggest
  }) => {
  const map = useMap();
  const map1 = useMapEvent('click', (e) => {
    if (editable) {
      setPosition([e?.latlng?.lat, e?.latlng?.lng])
      setSuggestion((prev) => ({
        ...prev,
        lat: e?.latlng?.lat,
        long: e?.latlng?.lng,
      }))
      setEditable(false)
      openDrawerAndSuggest()
    }
  })

  useEffect(() => {
    if (mapCenter) {
      map.flyTo(mapCenter, 13);
    }
  }, [mapCenter])

  var greenIcon = L.icon({
    iconUrl: markerIcon,
    // shadowUrl: '../Images/marker.png',

    iconSize: [30, 42],
    iconAnchor: [15, 42]
    // shadowSize: [50, 64], // size of the shadow
    // shadowAnchor: [4, 62],  // the same for the shadow
  });

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers?.length && markers?.map((item, index) => {
        return (<Marker
          icon={greenIcon}
          key={index}
          position={[item?.lat, item?.long]}
          eventHandlers={{
            click: (e) => {
              console.log(item?.contact?.phone_no)
              setLocationModal({
                visible: true,
                title: item?.locationname,
                content: item?.description,
                phone_no: item?.contact?.phone_no,
                lat: item?.lat,
                long: item?.long
              })
            },
          }}
        >
        </Marker>
        )
      })} <Marker
        // icon={greenIcon}
        position={mapCenter}
      >
        <Popup>Your location</Popup>
      </Marker>

    </>
  );
};

const Map = (
  {
    mapCenter,
    markers,
    markerIcon,
    editable,
    setPosition,
    setSuggestion,
    setLocationModal,
    setEditable,
    openDrawerAndSuggest
  }) => {
  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
      className="map"
    >
      <MapContent
        mapCenter={mapCenter}
        markers={markers}
        markerIcon={markerIcon}
        setPosition={setPosition}
        setSuggestion={setSuggestion}
        editable={editable}
        setLocationModal={setLocationModal}
        setEditable={setEditable}
        openDrawerAndSuggest={openDrawerAndSuggest}
      />
    </MapContainer>
  );
};
export default Map;
