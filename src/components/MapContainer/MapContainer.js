import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import './MapContainer.scss';
import { markerPosition, setMarkerPosition } from '../../slices/globalSlice';
import { useSelector, useDispatch } from 'react-redux';
import MapFilter from '../MapFilter/MapFilter';
import SearchPanel from '../SearchPanel/SearchPanel';
import ItemPopup from '../ItemPopup/ItemPopup';

const containerStyle = {
  width: '100%',
  height: '92vh',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MapContainer() {
  const markerPosition = useSelector((state) => state.global.markerPosition);
  const vm = useSelector((state) => state.global.viewMode);
  const [itemPopupOpen, setItemPopupOpen] = useState(false);
  const id = itemPopupOpen ? 'simple-popover' : undefined;

  const [localPos, setLocalPos] = React.useState(null);
  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBw1ephcAXQqGUX7nDxGkw5E-3uIE_ZAno',
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMapClick = (e) => {
    setLocalPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setItemPopupOpen(true);
    setTimeout(() => {
      dispatch(setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() }));
      // setLocalPos(null);
    }, 500);
  };

  function handlePopupClose() {
    setItemPopupOpen(false);
  }

  return isLoaded ? (
    <div className="google-map full-screen-map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        fullscreenControl={false}
      >
        {localPos && <Marker position={localPos} aria-describedby={id} />}
        <>
          {vm === 'homeless' && (
            <>
              <div className="searchPanelBox">
                <SearchPanel />
              </div>
              <div className="mapFilterBox">
                <MapFilter />
              </div>
              <div className="itemPopBox">
                <ItemPopup
                  open={itemPopupOpen}
                  onClose={handlePopupClose}
                  id={id}
                />
              </div>
            </>
          )}
        </>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MapContainer);
