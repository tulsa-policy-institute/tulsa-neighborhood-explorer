import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { extractSlug } from '../util/extract-slug';
import { MapContext } from './App';
import Stat from '../ui/Stat';

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
      </div>
      <div className="stats shadow w-full">
        <Stat
          title={'Overall Score'}
          description={'based on a composite score including Strategic Planning Screening'}
        >
          {neighborhood.overall_score}
        </Stat>
        <Stat
          title={'Group'}
          description={'based on the overall score'}
        >
          {neighborhood.overall_health_percentile}
        </Stat>
      </div>
      <div className="stats shadow mt-2">
        <Stat
          title={'Top Performing Indicators'}
          description={'indicates employment rate, labor force participation, and education attainment are high.'}
        >
          <div className="radial-progress text-black text-sm m-1" style={{"--value": neighborhood.tp1_score / 5 * 100}}>70%</div>
          <div className="radial-progress text-black text-sm m-1" style={{"--value": neighborhood.tp1_score / 5 * 100}}>70%</div>
          <div className="radial-progress text-black text-sm m-1" style={{"--value": neighborhood.tp1_score / 5 * 100}}>70%</div>
        </Stat>
      </div>
      <div className="stats shadow mt-2">
        <Stat
          title={'Lowest Performing Indicators'}
          description={'indicates employment rate, labor force participation, and education attainment are high.'}
        >
          <div className="radial-progress text-black text-sm m-1" style={{"--value": neighborhood.tp1_score / 5 * 100}}>70%</div>
          <div className="radial-progress text-black text-sm m-1" style={{"--value": neighborhood.tp1_score / 5 * 100}}>70%</div>
          <div className="radial-progress text-black text-sm m-1" style={{"--value": neighborhood.tp1_score / 5 * 100}}>70%</div>
        </Stat>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
        <div className="collapse-title text-xl font-medium">
          Land Use
        </div>
        <div className="collapse-content"> 
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
        <div className="collapse-title text-xl font-medium">
          Transportation
        </div>
        <div className="collapse-content"> 
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </>
}

export default Profile;
