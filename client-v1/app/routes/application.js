import Route from '@ember/routing/route';
import { dasherize } from '@ember/string';
import fetch from 'fetch';
import { filterForProfileTracts } from '../helpers/filter-for-profile-tracts';

const CARTO_URL = 'https://wilburnforce.carto.com:443/api/v2/sql';
const SQL_Query = `
  SELECT
    g.*,
    g.cartodb_id as id,
    g.map_id,
    s.overall_score,
    s.overall_rank,
    s.overall_health_percentile,
    s.top_performing_1,
    s.tp1_score,
    s.top_performing_2,
    s.tp2_score,
    s.top_performing_3,
    s.tp3_score,
    s.lowest_performing_3,
    s.lp3_score,
    s.lowest_performing_2,
    s.lp2_score,
    s.lowest_performing_1,
    s.lp1_score
  FROM tpo_nci_scores s
  INNER JOIN nsa_boundaries g ON s.map_id = g.map_id
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
      features: data.features.map((n) => {
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
            __FAKE__group: getRandomInt(1, 4),

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

    return {
      neighborhoodsGeoJson,
      neighborhoods,
    };
  }
}
