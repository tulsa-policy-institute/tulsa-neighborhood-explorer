import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from '../layout/Header';
import getNeighborhoodProfiles from '../util/getNeighborhoodProfiles';
import MainMap from '../features/MainMap';
import Index from './Index';
import Profile from './Profile';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    getNeighborhoodProfiles(setData);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col box-border h-full w-full max-h-screen">
      <Header className="z-10" />
      <div className="flex flex-col sm:flex-row h-full overflow-scroll">
        <div className="basis-1/4 relative">
          <MainMap neighborhoods={data.neighborhoodsGeoJson} />
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
            <Route path="/profiles/:slug" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
