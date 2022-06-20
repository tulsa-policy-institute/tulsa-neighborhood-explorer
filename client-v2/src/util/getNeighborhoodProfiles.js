import dasherize from "./dasherize";
import filterForProfileTracts from "./filterForProfileTracts";

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

export default async function getNeighborhoodProfiles(setData) {
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
