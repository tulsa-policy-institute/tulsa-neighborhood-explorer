import React, { useState, createContext } from 'react';
import { Routes, Route  } from 'react-router-dom';
import Header from '../ui/Header';
import MainMap from '../features/MainMap';
import Index from './Index';
import Profile from './Profile';
import SearchBar from '../features/SearchBar';
import { useNeighborhoods } from '../util/use-neighborhoods';

export const MapContext = createContext();

function App() {
  const [mapInstance, setMapInstance] = useState(null);
  const { neighborhoods } =  useNeighborhoods();

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
                neighborhoods={neighborhoods}
              />
            </div>
          </div>
          <div className="basis-3/4 border-l-8 max-h-full overflow-scroll">
            <Routes>
              <Route path="/" element={<Index neighborhoods={neighborhoods} />} />
              <Route path="/profiles/:slug" element={neighborhoods && <Profile data={neighborhoods} />} />
            </Routes>
          </div>
        </div>
      </MapContext.Provider>
    </div>
  );
}

export default App;
