import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { extractSlug } from '../util/extract-slug';
import { MapContext } from './App';
import { useAssessments } from '../util/use-assessments';

function Profile({ data }) {
  const map = useContext(MapContext);
  const { assessments: neighborhoods, isLoading } =  useAssessments();
  const { slug } = useParams();

  useEffect(() => {
    if (!map) return;

    return map.selectBoundary(slug);
  }, [slug, map])
  
  if (isLoading) return 'Loading...';

  const neighborhood = neighborhoods.find(n => extractSlug(n) === slug);

  return <>
    <div className="top-0 w-full">
      <div className="px-5">
        <h1 className="text-lg md:py-2 md:text-6xl">{neighborhood.neighborhood}</h1>
        <p className="text-sm">
          {/* Census Tracts: {neighborhood.normalizedTractIDs.join(', ')} */}
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
    <div className="p-5 md:p-7">
      <p>
        <b>The {neighborhood.neighborhood} Neighborhood Statistical Area</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tempore aperiam odit voluptatibus velit qui optio quam exercitationem incidunt animi rem voluptate necessitatibus, nostrum obcaecati enim, ullam itaque et pariatur.
      </p>
    </div>
  </>
}

export default Profile;
