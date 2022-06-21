import React, { useContext, useEffect } from 'react'
import { useParams } from "react-router-dom";
import bbox from '@turf/bbox';
import { isMobile } from 'react-device-detect';
import { MapContext } from './App';

function Profile({ data }) {
  const map = useContext(MapContext);
  const { slug } = useParams();
  const { neighborhoods, neighborhoodsGeoJson } = data;

  useEffect(() => {
    const feature = neighborhoodsGeoJson.features.find(
      (n) => n.properties.slug === slug
    );
    const neighborhoodBounds = bbox(feature);

    map.setFeatureState({
      source: 'neighborhoods',
      id: feature.properties.id,
    }, {
      selected: true,
    });

    map.fitBounds(neighborhoodBounds, {
      // TODO: add mobile detection
      padding: isMobile ? 0 : 75,
    });

    return () => {
      map.setFeatureState({
        source: 'neighborhoods',
        id: feature.properties.id,
      }, {
        selected: false,
      });
    }
  }, [slug, neighborhoodsGeoJson, map]);

  const neighborhood = neighborhoods.find(n => n.slug === slug);

  return <>
    <div className="top-0 w-full">
      <div className="px-5">
        <h1 className="text-lg md:py-2 md:text-6xl">{neighborhood.neighborhood}</h1>
        <p className="text-sm">
          {neighborhood.normalizedTractIDs.join(', ')}
        </p>
      </div>
      <div className="bg-gray-50">
        <div className="px-5">
          <ul className="flex flex-col md:flex-row">
            <li className="text-sm p-1 md:p-3 hover:bg-gray-100 font-light cursor-pointer">Assessment</li>
            <li className="text-sm p-1 md:p-3 hover:bg-gray-100 font-light cursor-pointer">Built Environment</li>
            <li className="text-sm p-1 md:p-3 hover:bg-gray-100 font-light cursor-pointer">Floodplain</li>
            <li className="text-sm p-1 md:p-3 hover:bg-gray-100 font-light cursor-pointer">Projects</li>
            <li className="text-sm p-1 md:p-3 hover:bg-gray-100 font-light cursor-pointer">Resources</li>
          </ul>
        </div>
      </div>
    </div>
  </>
}

export default Profile;
