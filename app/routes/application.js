import Route from '@ember/routing/route';
import fetch from 'fetch';
import { csvParse } from 'd3-dsv';

export default class ApplicationRoute extends Route {
  async model() {
    const neighborhoodsCsv = await (
      await fetch('/data/neighborhoods.csv?a=b')
    ).text();

    const neighborhoods = await csvParse(neighborhoodsCsv);

    return {
      neighborhoods: neighborhoods,
      list: neighborhoods.map((n) => n.neighborhood),
    };
  }
}
