import Route from '@ember/routing/route';
import { dasherize } from '@ember/string';
import fetch from 'fetch';

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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}

export default class ApplicationRoute extends Route {
  async model() {
    const data = await (await fetch(CARTO_QUERY)).json();

    const neighborhoodsGeoJson = {
      type: 'FeatureCollection',
      features: data.features.map((n) => {
        return {
          ...n,
          properties: {
            slug: `${dasherize(n.properties.neighborhood || '')}-${
              n.properties.map_id
            }`,
            normalizedTractIDs: n.properties.tracts_201
              .split(',')
              .map((id) => parseFloat(id.trim()).toString()),
            ...n.properties,

            // TODO: replace with real values!!!
            __FAKE__overall_score: Math.random().toFixed(1),
            __FAKE__group: getRandomInt(1, 4),
          },
        };
      }),
    };

    const neighborhoods = neighborhoodsGeoJson.features.map(
      (n) => n.properties
    );

    return {
      neighborhoodsGeoJson,
      neighborhoods,
    };
  }
}
