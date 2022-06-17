import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import maplibregl from 'maplibre-gl'
import { ProtocolCache } from 'pmtiles';
import 'maplibre-gl/dist/maplibre-gl.css'

// import classNames from 'classnames'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
// import { useDeviceSelectors } from 'react-device-detect'
// import { useLocation } from 'react-router-dom'
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

// REUSABLE — STAY GENERIC
export default React.memo(function Map({
  width = '100%',
  height = '100%',
  zoom = 0,
  center = [0, 0],
  style = 'light-v9',
  sources = {},
  layers = [],
  minZoom = 10,
  maxZoom = 18,
  bounds = [],
  padding = 0.1,
  areaOfInterest,
  drawnFeature,
  serviceRequests,
  startDateMoment,
  allGeometries,
  highlightedFeature,
  drawMode,
  onDraw,
  onLoad = () => {},
  onMapClick,
}) {
  const cache = new ProtocolCache();
  maplibregl.addProtocol('pmtiles', cache.protocol);
  
  // this ref holds the map DOM node so that we can pass it into Mapbox GL
  const mapNode = useRef(null)

  // instantiate the map, add sources and layers, event listeners, tooltips
  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapNode.current,
      style: '/data/style.json',
      zoom: 10,
      center: [-95.9688, 36.1314],
      minZoom,
      maxZoom,
    });

    map.on('load', () => {
      onLoad(map)
      window.map = map // for easier debugging and querying via console
    });

    return () => {
      map.remove()
    }
  }, [maxZoom, minZoom, onLoad]);

  console.log('renders');

  return (
    <div
      className='map-container'
      ref={mapNode}
    />
  );
});
