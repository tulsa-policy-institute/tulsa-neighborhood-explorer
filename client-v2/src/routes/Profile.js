import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { extractSlug } from '../util/extract-slug';
import { MapContext } from './App';
import PopulationChart from '../features/PopulationChart';
import Stat from '../ui/Stat';
import Card from '../ui/Card';

function Profile({ data: neighborhoods }) {
  const map = useContext(MapContext);  
  const { slug } = useParams();
  const neighborhood = neighborhoods.find(n => extractSlug(n) === slug);

  useEffect(() => {
    if (!map) return;

    return map.selectBoundary(slug);
  }, [slug, map])

  return <>
    <div className='sm:w-full bg-gray-50'>
      <ul className="menu menu-vertical lg:menu-horizontal">
        <li><a>Assessment</a></li>
        <li><a>Built Environment</a></li>
        <li><a>Floodplain</a></li>
        <li><a>Projects</a></li>
        <li><a>Resources</a></li>
      </ul>
    </div>
    <main className='m-4'>
      <div className='m-3'>
        <h1 className='font-headings text-3xl'>
          {neighborhood.neighborhood}
        </h1>
        <div className='prose font-body'>
          <p>Census Tracts: {neighborhood.normalizedTractIDs.join(', ')}</p>

          <b>The {neighborhood.neighborhood} Neighborhood Statistical Area </b>
          {neighborhood.overview}
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div className='shadow'>
            <div className="stat stat-title">Population Growth</div>
            <PopulationChart
              dataArg={[
                {year: "2000", value: neighborhood.census2000.PL001001},
                {year: "2010", value: neighborhood.census2010.P001001},
                {year: "2020", value: neighborhood.census2020.P1_001N},
              ]}
            />
          </div>
          <div className='shadow'>
            <Stat
              title={'Square Miles'}
            >
              {neighborhood.sq_miles}
            </Stat>
          </div>
        </div>
      </div>
    </main>
  </>
}

export default Profile;
