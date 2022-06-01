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

export default class ApplicationRoute extends Route {
  async model() {
    const neighborhoodsGeoJson = await (await fetch(CARTO_QUERY)).json();
    neighborhoodsGeoJson.features.forEach((n) => {
      n.properties = {
        slug: `${dasherize(n.properties.neighborhood || '')}-${
          n.properties.map_id
        }`,
        ...n.properties,
      };
    });

    const neighborhoods = neighborhoodsGeoJson.features.map(
      (n) => n.properties
    );

    return {
      neighborhoodsGeoJson,
      neighborhoods,
      list: neighborhoods.map((n) => n.neighborhood),
    };
  }
}
