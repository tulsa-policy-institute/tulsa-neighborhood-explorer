import React, { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import { ProtocolCache } from 'pmtiles';
import 'maplibre-gl/dist/maplibre-gl.css'

class ThematicMap extends maplibregl.Map {
  addLayer(...args) {
    const [{ id, interactions }] = args;

    if (interactions && interactions.hover) {
      this.on('mouseenter', id, () => {
        this.getCanvas().style.cursor = 'pointer'
      });

      this.on('mouseleave', id, () => {
        this.getCanvas().style.cursor = ''
      });
    }

    if (interactions && interactions.onClick) {
      this.on('click', id, interactions.onClick);
    }

    return super.addLayer(...args);
  }
}

function Map({
  minZoom = 10,
  maxZoom = 18,
  onLoad = () => {},
}) {
  const cache = new ProtocolCache();
  maplibregl.addProtocol('pmtiles', cache.protocol);

  // this ref holds the map DOM node so that we can pass it into Mapbox GL
  const mapNode = useRef(null)

  // instantiate the map, add sources and layers, event listeners, tooltips
  useEffect(() => {
    const map = new ThematicMap({
      container: mapNode.current,
      style: '/data/style.json',
      zoom: 10,
      center: [-95.9688, 36.1314],
      minZoom,
      maxZoom,
    });

    map.on('load', () => {
      onLoad(map);

      window.map = map // for easier debugging and querying via console
    });

    return () => {
      map.remove();
    }
  }, []);

  return (
    <div
      className='map-container'
      ref={mapNode}
    />
  );
};

export default Map;
