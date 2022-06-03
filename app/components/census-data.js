import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

const API_KEY = 'a036e6c9b1f578e84bafe0a0514bb4faf59359dc';
const URI = 'https://api.census.gov/data/2020/acs/acs5';
const variables = ['B01001_001E'];

export default class CensusDataComponent extends Component {
  constructor(...args) {
    super(...args);

    this.fetchData();
  }

  @tracked
  results = [];

  get queryURI() {
    const {
      cols = `NAME,${variables.join(',')}`,
      state = '40',
      county = '143,113,145',
    } = this.args;

    return `${URI}?get=SUMLEVEL,${cols}&for=tract:*&in=state:${state}&in=county:${county}&key=${API_KEY}`;
  }

  async fetchData() {
    const data = await (await fetch(this.queryURI)).json();

    this.results = data;
  }

  get resultsNormalized() {
    const results = this.results;
    const keys = results.shift();

    // convert from array of arrays to array of hashes, keyed by first element
    const hashify = results.map((r) => {
      return {
        ...r.reduce((acc, curr, idx) => ({ [keys[idx]]: curr, ...acc }), {}),
      };
    });

    // strip away unnecessary values from name
    return hashify.map((h) => {
      // only if it's a census tract
      if (h['SUMLEVEL'] === '140') {
        try {
          return {
            ...h,
            NAME: h['NAME'].split(',')[0].split('Census Tract ')[1],
          };
        } catch (e) {
          console.log(e);

          return h;
        }
      } else {
        return h;
      }
    });
  }
}
