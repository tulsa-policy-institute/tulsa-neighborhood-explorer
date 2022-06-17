import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './layout/Header';
import MainMap from './features/main-map';
import filterForProfileTracts from './util/filter-for-profile-tracts';
import dasherize from './util/dasherize';

const CARTO_URL = 'https://wilburnforce.carto.com:443/api/v2/sql';
const SQL_Query = `
  SELECT
    g.*,
    g.cartodb_id as id,
    g.map_id,
    s.equal_interval_score,
    s.lu_1_0_to_5,
    s.lu_2_0_to_5,
    s.lu_3_0_to_5,
    s.lu_4_0_to_5,
    s.lu_5_0_to_5,
    s.lu_6_0_to_5,
    s.lu_7_0_to_5,
    s.lu_8_0_to_5,
    s.lu_9_0_to_5,
    s.lu_10_0_to_5,
    s.lu_11_0_to_5,
    s.lu_12_0_to_5
  FROM tpo_nha_scores s
  INNER JOIN nsa_boundaries g ON s.nid = g.map_id
`;
const CARTO_QUERY = `${CARTO_URL}?q=${SQL_Query}&format=geojson`;

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const scores = await (await fetch(CARTO_QUERY)).json();
      const census2000 = await (
        await fetch('/census/data/2000/dec/pl.json')
      ).json();
      const census2010 = await (
        await fetch('/census/data/2010/dec/pl.json')
      ).json();
      const census2020 = await (
        await fetch('/census/data/2020/dec/pl.json')
      ).json();

      const neighborhoodsGeoJson = {
        type: 'FeatureCollection',
        features: scores.features.map((n) => {
          const normalizedTractIDs = n.properties.tracts_202
            .split(',')
            .map((id) => parseFloat(id.trim()).toString());

          return {
            ...n,
            properties: {
              ...n.properties,

              slug: `${dasherize(n.properties.neighborhood || '')}-${
                n.properties.map_id
              }`,
              normalizedTractIDs,

              // TODO: replace with real values!!!
              __FAKE__overall_score: Math.random().toFixed(1),
              __FAKE__group: 1,

              census2000: filterForProfileTracts([
                census2000,
                normalizedTractIDs,
              ]),
              census2010: filterForProfileTracts([
                census2010,
                normalizedTractIDs,
              ]),
              census2020: filterForProfileTracts([
                census2020,
                normalizedTractIDs,
              ]),
            },
          };
        }),
      };

      const neighborhoods = neighborhoodsGeoJson.features.map(
        (n) => n.properties
      );

      setData({
        neighborhoodsGeoJson,
        neighborhoods,
      });
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col box-border h-full w-full max-h-screen">
      <Header className="z-10" />
      <div className="flex flex-col sm:flex-row h-full overflow-scroll">
        <div className="basis-1/4 relative">
          <MainMap
            neighborhoods={data.neighborhoodsGeoJson}
          />
          <div className="absolute top-1 w-full md:top-10 md:p-1">
            {/* <SearchBar
              className="m-2"
              @list={{this.model.neighborhoods}}
            /> */}
          </div>
        </div>
        <div className="basis-3/4 border-l-8 max-h-full overflow-scroll">
          <div className="flex flex-col p-5 md:p-7">
            <div className="basis-full">
              <h2 className="text-3xl">
                Welcome
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tempore aperiam odit voluptatibus velit qui optio quam exercitationem incidunt animi rem voluptate necessitatibus, nostrum obcaecati enim, ullam itaque et pariatur.
              </p>
              {/* <SearchBar
                @list={{this.model.neighborhoods}}
              /> */}
            </div>
            <div className="basis-full">
              <h1 className="text-xl">Explore</h1>

              <p className="pb-4">Maps and statistics illustrate each district’s built environment, socio‑economic, and demographic characteristics. Dynamic charts compare conditions across districts.</p>

              <h1 className="text-xl">Learn</h1>

              <p className="pb-4">Each community district is unique. Find out about your community board's budget priorities and most pressing concerns, and learn about the projects and neighborhood studies that are happening in your district.</p>

              <h1 className="text-xl">Download</h1>

              <p className="pb-4">Each profile's indicators, land use and zoning data, and more are available for your use and analysis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
