import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route  } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../util/fetcher';
import Header from '../ui/Header';
import getNeighborhoodProfiles from '../util/getNeighborhoodProfiles';
import MainMap from '../features/MainMap';
import Index from './Index';
import Profile from './Profile';
import SearchBar from '../features/SearchBar';

export const MapContext = createContext();
const ASSESSMENTS_URL = 'https://raw.githubusercontent.com/tulsa-policy-institute/tulsa-neighborhood-explorer/master/data/assessments.min.json';
const NSA_BOUNDARIES_URL = '/data/nsa_boundaries.json';

function App() {
  const [data, setData] = useState({});
  const [mapInstance, setMapInstance] = useState(null);
  const { data: assessments } = useSWR(ASSESSMENTS_URL, fetcher);

  useEffect(() => {
    // TODO https://swr.vercel.app vs https://react-query.tanstack.com
    getNeighborhoodProfiles(setData);
  }, []);

  return (
    <div className="flex flex-col box-border h-full w-full max-h-screen">
      <MapContext.Provider value={mapInstance}>
        <Header className="z-10" />
        <div className="flex flex-col sm:flex-row h-full overflow-scroll">
          <div className="basis-1/4 relative">
            <MainMap
              onLoad={(map) => { setMapInstance(map); }}
              map={mapInstance}
            />
            <div className="absolute top-1 w-full md:top-10 md:p-1">
              <SearchBar
                className="m-2"
                list={data.neighborhoods}
              />
            </div>
          </div>
          <div className="basis-3/4 border-l-8 max-h-full overflow-scroll">
            <Routes>
              <Route path="/" element={<Index neighborhoods={data.neighborhoods} />} />
              <Route path="/profiles/:slug" element={(data.neighborhoods) && <Profile data={data} />} />
            </Routes>
          </div>
        </div>
      </MapContext.Provider>
    </div>
  );
}

export default App;
