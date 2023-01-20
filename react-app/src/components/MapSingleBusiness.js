import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { useSelector, useDispatch } from 'react-redux';
import { getKey } from '../store/map';

// const libraries = ['places'];

const Map = ({ apiKey, business }) => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: apiKey,
		// libraries
	  });

	return (
		<>
			{isLoaded && (
				<SingleMap business={business} isLoaded={isLoaded} />
			)}
		</>
	)
}

const SingleMap = ({ isLoaded, business }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const key = useSelector((state) => state.map.key);
  const dispatch = useDispatch();

  // set response language. Defaults to english.
  Geocode.setLanguage('en');

  Geocode.setLocationType('ROOFTOP');

  // Enable or disable logs. Its optional.
  Geocode.enableDebug();

  useEffect(() => {
    dispatch(getKey());
  }, [dispatch]);

  useEffect(() => {
    if (key) {
      Geocode.setApiKey(key);
      Geocode.fromAddress(`${business.address}, ${business.city}`).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setCurrentPosition({ lat, lng });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [key]);



  const containerStyle = {
    width: '315px',
    height: '254px'
  };

  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="map_page__container">
      <div style={{ height: '230px', width: '300px', marginTop: '2em', marginBottom: '2em' }}>
        {isLoaded && currentPosition ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={13}
            center={currentPosition}
            onUnmount={onUnmount}
          >
            <Marker
              position={currentPosition}
              title="red-marker"
              streetView={false}
            />
          </GoogleMap>
        ) : null}
      </div>
    </div>
  );
};

export default Map;
