import React, { useContext } from 'react'
import { useParams } from "react-router-dom";
import { MapContext } from './App';
import Map from '../ui/Map';

function Profile({ data }) {
  const map = useContext(MapContext);
  const { slug } = useParams();
  const { neighborhoods } = data;

  if (neighborhoods) {
    const neighborhood = neighborhoods.find(n => n.slug === slug);

    // TODO: fit bounds here
    // map

    return <>
      <div className="top-0 w-full">
        <div className="px-5">
          <h1 className="text-lg md:py-2 md:text-6xl">{slug}</h1>
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
      <Map />
    </>
  }

  return <></>;
}

export default Profile;
