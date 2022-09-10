import Route from '@ember/routing/route';
import { dasherize } from '@ember/string';
import fetch from 'fetch';
import { filterForProfileTracts } from '../helpers/filter-for-profile-tracts';

export default class ApplicationRoute extends Route {
  async model() {
    // const data = await (await fetch(CARTO_QUERY)).json();
    const data = await (await fetch('/data/nsa_boundaries.json')).json();
    const assessments = await (await fetch('/data/tpo_nci_scores.json')).json();

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
        const assessment = assessments.find(
          (d) => d.map_id === n.properties.map_id
        );
        const properties = {
          ...assessment,
          ...n.properties,
        };
        const normalizedTractIDs = properties.tracts_202
          .split(',')
          .map((id) => parseFloat(id.trim()).toString());

        return {
          ...n,
          properties: {
            ...properties,

            slug: `${dasherize(properties.neighorhoo || '')}-${
              properties.map_id
            }`,
            normalizedTractIDs,

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
