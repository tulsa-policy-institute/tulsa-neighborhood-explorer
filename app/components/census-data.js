import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

const API_KEY = 'a036e6c9b1f578e84bafe0a0514bb4faf59359dc';
const URI = 'https://api.census.gov/data/2020/acs/acs5';
const variables = [
  'B01001_002E',
  'B01001_003E',
  'B01001_004E',
  'B01001_005E',
  'B01001_006E',
  'B01001_007E',
  'B01001_008E',
  'B01001_009E',
  'B01001_010E',
  'B01001_011E',
  'B01001_012E',
  'B01001_013E',
  'B01001_014E',
  'B01001_015E',
  'B01001_016E',
  'B01001_017E',
  'B01001_018E',
  'B01001_019E',
  'B01001_020E',
  'B01001_021E',
  'B01001_022E',
  'B01001_023E',
  'B01001_024E',
  'B01001_025E',
  'B01001_026E',
  'B01001_027E',
  'B01001_028E',
  'B01001_029E',
  'B01001_030E',
  'B01001_031E',
  'B01001_032E',
  'B01001_033E',
  'B01001_034E',
  'B01001_035E',
  'B01001_036E',
  'B01001_037E',
  'B01001_038E',
  'B01001_039E',
  'B01001_040E',
  'B01001_041E',
  'B01001_042E',
  'B01001_043E',
  'B01001_044E',
  'B01001_045E',
  'B01001_046E',
  'B01001_047E',
  'B01001_048E',
  'B01001_049E',
];

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
      county = '143',
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
