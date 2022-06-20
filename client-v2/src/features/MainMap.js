import React from 'react';
import Map from '../ui/Map';
import { useNavigate } from "react-router-dom";

// issue: it re-renders the map because the data changes (fair)
// but, the jsx doesn't depend on the data, the didLoad callback does
// this withholds rendering unless there's data... preventing a double render...
// but what's a better solution? so that the map can load while the other data
// loads...
function MainMap({ neighborhoods, onLoad }) {
  const navigate = useNavigate();

  const didLoad = (map) => {
    onLoad(map);

    map.addSource('neighborhoods', {
      type: 'geojson',
      data: neighborhoods,
    });

    map.addLayer({
      id: 'neighborhoods',
      source: 'neighborhoods',
      type: 'fill',
      paint: {
        'fill-color': 'DodgerBlue',
        'fill-opacity': 0.2,
      },
      interactions: {
        hover: true,
        onClick: (e) => {
          const [feature] = e.features;

          navigate(`/profiles/${feature.properties.slug}`);
        },
      },
    });

    map.addLayer({
      id: 'neighborhoodLines',
      source: 'neighborhoods',
      type: 'line',
      paint: {
        'line-width': 1,
        'line-color': '#ae561f',
      },
    });

    map.addLayer({
      id: 'neighborhood-labels',
      source: 'neighborhoods',
      type: 'symbol',
      paint: {
        'text-color': 'rgba(66, 66, 66, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'white',
        'text-opacity': 0.75,
      },
      layout: {
        'text-field': '{neighborhood}',
        'text-allow-overlap': false,
        'symbol-placement': 'point',
      },
    });
  };

  return <>
    {neighborhoods && <Map
      onLoad={didLoad}
    />}
  </>;
};

export default React.memo(MainMap);
