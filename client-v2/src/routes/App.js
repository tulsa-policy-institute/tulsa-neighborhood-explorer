import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route  } from "react-router-dom";
import Header from '../layout/Header';
import getNeighborhoodProfiles from '../util/getNeighborhoodProfiles';
import MainMap from '../features/MainMap';
import Index from './Index';
import Profile from './Profile';

export const MapContext = createContext();

function App() {
  const [data, setData] = useState({});
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    // TODO https://swr.vercel.app vs https://react-query.tanstack.com
    getNeighborhoodProfiles(setData);
  }, []);

  const didLoad = (map) => {
    setMapInstance(map);
  };

  return (
    <div className="flex flex-col box-border h-full w-full max-h-screen">
      <MapContext.Provider value={mapInstance}>
        <Header className="z-10" />
        <div className="flex flex-col sm:flex-row h-full overflow-scroll">
          <div className="basis-1/4 relative">
            <MainMap
              neighborhoods={data.neighborhoodsGeoJson}
              onLoad={didLoad}
            />
            <div className="absolute top-1 w-full md:top-10 md:p-1">
              {/* <SearchBar
                className="m-2"
                @list={{this.model.neighborhoods}}
              /> */}
            </div>
          </div>
          <div className="basis-3/4 border-l-8 max-h-full overflow-scroll">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profiles/:slug" element={(mapInstance && data.neighborhoods) && <Profile data={data} />} />
            </Routes>
          </div>
        </div>
      </MapContext.Provider>
    </div>
  );
}

export default App;
