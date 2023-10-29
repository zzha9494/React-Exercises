import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
} from "@react-google-maps/api";

import "./MapContainer.scss";
import FormContainer from "../FormContainer/FormContainer";
import {
  markerPosition,
  setEvents,
  setMarkerPosition,
} from "../../slices/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import MapFilter from "../MapFilter/MapFilter";
import SearchPanel from "../SearchPanel/SearchPanel";
import ItemPopup from "../ItemPopup/ItemPopup";
import SudoActions from "../SudoActions/SudoActions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const containerStyle = {
  width: "100%",
  height: "92vh",
};

const center = {
  lat: -33.865143,
  lng: 151.2099,
};

const mapStyles = [
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.medical",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

function MapContainer() {
  const markerPosition = useSelector((state) => state.global.markerPosition);
  const vm = useSelector((state) => state.global.viewMode);
  const [itemPopupOpen, setItemPopupOpen] = useState(false);
  const [sudoActionsOpen, setsudoActionsOpen] = useState(false);
  const [selectedEventId, setselectedEventId] = useState(null);
  const id = itemPopupOpen ? "simple-popover" : undefined;
  const id1 = sudoActionsOpen ? "simple-popover" : undefined;
  const [selectedId, setselectedId] = useState(null);
  const events = useSelector((state) => state.global.events);

  const [radius, setRadius] = useState(0);
  const [shouldRenderCircle, setShouldRenderCircle] = useState(false);
  const [formModified, setFormModified] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const delayRender = setTimeout(() => {
      setShouldRenderCircle(true);
    }, 500);

    return () => clearTimeout(delayRender);
  }, []);
  const localPos = useSelector((state) => state.global.markerPosition);

  // const [localPos, setLocalPos] = React.useSelector(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBw1ephcAXQqGUX7nDxGkw5E-3uIE_ZAno",
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
    if (vm === "volunteer") {
      dispatch(setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() }));
    }
    if (vm === "homeless") {
      if (e.id) {
        // meaning the bypass event is our event
        setItemPopupOpen(true);
        setselectedId(e.id);
      }
    }
  };

  function handlePopupClose() {
    setItemPopupOpen(false);
    dispatch(setMarkerPosition(null));
  }
  function handleSudoActionsPopupClose() {
    setsudoActionsOpen(false);
  }

  // get events location
  const getEventsLocation = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/event/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const events = await response.json(); // 解析JSON响应
      const eventsArray = Object.keys(events).map((key) => events[key]);

      // 确保 events 是一个数组，如果不是数组，则将其转换为数组

      console.log("events", eventsArray);
      dispatch(setEvents(eventsArray));

      // 在这里处理响应数据
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    if (vm === "homeless") getEventsLocation();
  }, [vm]);

  return isLoaded ? (
    <div className="google-map full-screen-map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        clickableIcons={false}
        fullscreenControl={false}
        options={{
          styles: mapStyles,
        }}
      >
        {shouldRenderCircle && (
          <Circle
            center={center}
            radius={radius * 140}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.1,
            }}
          />
        )}
        {localPos && <Marker position={localPos} aria-describedby={id} />}
        {events &&
          events.map((event) => {
            return (
              <Marker
                position={{ lat: event.latitude, lng: event.longitude }}
                aria-describedby={id1}
                onClick={() => {
                  if (vm === "volunteer") {
                    setsudoActionsOpen(true);
                    setselectedEventId(event.id);
                  }
                  if (vm === "homeless") {
                    handleMapClick(event);
                  }
                }}
              />
            );
          })}
        <>
          {vm === "homeless" && (
            <>
              <div className="searchPanelBox">
                <SearchPanel />
              </div>
              <div className="mapFilterBox">
                <MapFilter
                  events={events}
                  setEvents={() => {}}
                  setRadius={setRadius}
                />
              </div>
              <div className="itemPopBox"></div>
              <ItemPopup
                open={itemPopupOpen}
                onClose={handlePopupClose}
                id={id}
                selectedId={selectedId} //event id
              />
            </>
          )}

          {vm === "volunteer" && (
            <FormContainer
              eventId={selectedEventId}
              formModified={formModified}
              setFormModified={setFormModified}
            />
          )}

          {vm === "volunteer" && (
            <SudoActions
              id={id1}
              eventId={selectedEventId}
              open={sudoActionsOpen}
              onClose={handleSudoActionsPopupClose}
              setFormModified={setFormModified}
            />
          )}
        </>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MapContainer);
