import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { extractSlug } from '../util/extract-slug';
import { MapContext } from './App';

function Profile({ data: neighborhoods }) {
  const map = useContext(MapContext);  
  const { slug } = useParams();
  const neighborhood = neighborhoods.find(n => extractSlug(n) === slug);

  useEffect(() => {
    if (!map) return;

    return map.selectBoundary(slug);
  }, [slug, map])

  return <>
    <div className='invisible drop-shadow sm:visible sm:w-full bg-gray-50 fixed z-10'>
      <ul className="tabs">
        <li className='tab tab-bordered tab-active'>Assessment</li>
        <li className='tab tab-bordered'>Built Environment</li>
        <li className='tab tab-bordered'>Floodplain</li>
        <li className='tab tab-bordered'>Projects</li>
        <li className='tab tab-bordered'>Resources</li>
      </ul>
    </div>
    <div className='mb-10'></div>
    <main className='flex flex-col gap-4 m-4'>
      <div className='flex flex-row gap-8'>
        <section className='basis-1/2 neighborhood-header'>
          <h1 className='font-headings text-3xl'>
            {neighborhood.neighborhood}
          </h1>
          <p>Census Tracts: {neighborhood.normalizedTractIDs.join(', ')}</p>
          <div className='basis-1/2 prose font-body max-h-40 overflow-auto'>
            {neighborhood.overview}
          </div>
        </section>
        <section className='basis-1/2 gap-8 m-auto'>
          <div className='statistics'>
            <div className='stats-group'>
              <h1 className='text-xl font-headings text-gray-500'>Population</h1>
              <div className="stat-group flex flex-col w-full lg:flex-row">
                <div className="grid h-20 flex-grow place-items-center">
                  <div className="stat-value">{neighborhood.census2010.P001001?.toLocaleString() || 'No Data'}</div>
                  <div className="stat-desc">2010 Census</div>
                </div>
                <div className="grid h-20 flex-grow place-items-center">
                  <div className="stat-value">{neighborhood.census2020.P1_001N?.toLocaleString() || 'No Data'}</div>
                  <div className="stat-desc">2020 Census</div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grid h-20 flex-grow place-items-center">
                  <div className="stat-value">{neighborhood.sq_miles.toFixed(2)}</div>
                  <div className="stat-desc">Square Miles</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className='divider text-gray-500'>Assessment</div>
      <section className='assessment flex flex-col gap-8'>
        <div className='statistics'>
          <h1 className='text-xl font-headings text-gray-500'>Overall Score</h1>
          <div className="stat-group flex flex-col w-full lg:flex-row">
            <div className="grid h-20 basis-1/2 flex-grow place-items-center">
              <div className="stat-value">{neighborhood.overall_score} / 5</div>
              <div className="stat-desc prose">based on a composite score</div>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="grid h-20 basis-1/2 flex-grow place-items-center">
              <div className="stat-value">{neighborhood.overall_health_percentile}</div>
              <div className="stat-desc">based on the top and bottom 25% percentile</div>
            </div>
          </div>
        </div>
        <div className='top-performing'>
          <div className='stats-group'>
            <h1 className='text-xl font-headings text-gray-500'>Top Performing</h1>
            <div className="stat-group flex justify-evenly flex-col gap-8 w-full p-8 lg:flex-row">
              <div className="grid flex justify-items-center content-start">
                <div className='stat-title'>{neighborhood.top_performing_1}</div>
                <div
                  className="radial-progress text-green-800 m-1"
                  style={{"--value": neighborhood.tp1_score / 5 * 100, "--size": "6rem", "--thickness": "2px"}}
                >
                  <span className='stat-value text-black'>{neighborhood.tp1_score?.toFixed(2)}</span>
                </div>
                <div className="stat-desc prose wrap whitespace-normal text-md">{neighborhood.tp1_description}</div>
              </div>
              <div className="grid flex justify-items-center content-start">
                <div className='stat-title'>{neighborhood.top_performing_2}</div>
                <div
                  className="radial-progress text-green-800 m-1"
                  style={{"--value": neighborhood.tp2_score / 5 * 100, "--size": "6rem", "--thickness": "2px"}}
                >
                  <span className='stat-value text-black'>{neighborhood.tp2_score?.toFixed(2)}</span>
                </div>
                <div className="stat-desc prose wrap whitespace-normal text-md">{neighborhood.tp2_description}</div>
              </div>
              <div className="grid flex justify-items-center content-start">
                <div className='stat-title'>{neighborhood.top_performing_3}</div>
                <div
                  className="radial-progress text-green-800 m-1"
                  style={{"--value": neighborhood.tp3_score / 5 * 100, "--size": "6rem", "--thickness": "2px"}}
                >
                  <span className='stat-value text-black'>{neighborhood.tp2_score?.toFixed(2)}</span>
                </div>
                <div className="stat-desc prose wrap whitespace-normal text-md">{neighborhood.tp3_description}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='low-performing'>
          <div className='stats-group'>
            <h1 className='text-xl font-headings text-gray-500'>Lowest Performing</h1>
            <div className="stat-group flex justify-evenly flex-col gap-8 w-full p-8 lg:flex-row">
              <div className="grid flex justify-items-center content-start">
                <div className='stat-title'>{neighborhood.lowest_performing_1}</div>
                <div
                  className="radial-progress text-green-800 m-1"
                  style={{"--value": neighborhood.lp1_score / 5 * 100, "--size": "6rem", "--thickness": "2px"}}
                >
                  <span className='stat-value text-black'>{neighborhood.lp1_score?.toFixed(2)}</span>
                </div>
                <div className="stat-desc prose wrap whitespace-normal text-md">{neighborhood.lp1_description}</div>
              </div>
              <div className="grid flex justify-items-center content-start">
                <div className='stat-title'>{neighborhood.lowest_performing_2}</div>
                <div
                  className="radial-progress text-green-800 m-1"
                  style={{"--value": neighborhood.lp2_score / 5 * 100, "--size": "6rem", "--thickness": "2px"}}
                >
                  <span className='stat-value text-black'>{neighborhood.lp2_score?.toFixed(2)}</span>
                </div>
                <div className="stat-desc prose wrap whitespace-normal text-md">{neighborhood.lp2_description}</div>
              </div>
              <div className="grid flex justify-items-center content-start">
                <div className='stat-title'>{neighborhood.lowest_performing_3}</div>
                <div
                  className="radial-progress text-green-800 m-1"
                  style={{"--value": neighborhood.lp3_score / 5 * 100, "--size": "6rem", "--thickness": "2px"}}
                >
                  <span className='stat-value text-black'>{neighborhood.lp3_score?.toFixed(2)}</span>
                </div>
                <div className="stat-desc prose wrap whitespace-normal text-md">{neighborhood.lp3_description}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='divider text-gray-500'>Statistics</div>
      <div className='divider text-gray-500'>Built Environment</div>
      <div className='divider text-gray-500'>Floodplain</div>
      <div className='divider text-gray-500'>Projects</div>
      <div className='divider text-gray-500'>Resources</div>
    </main>
  </>
}

export default Profile;
