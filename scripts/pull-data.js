const fetch = require('node-fetch');
const { mkdir, writeFile } = require('fs');

const run = async (opts) => {
  const { path, variables } = opts;
  let API_KEY = 'a036e6c9b1f578e84bafe0a0514bb4faf59359dc';
  let URI = `https://api.census.gov/${path}`;
  let cols = `NAME,SUMLEVEL,${variables.join(',')}`;

  // TODO: if more than 50 vars split up into separate requests
  if (cols.split(',').length > 50) {
    console.warn('Approaching API variables limit!');
  }

  let state = '40';
  let county = '143,113,145';
  let queryURI = `${URI}?get=${cols}&for=tract:*&in=state:${state}&in=county:${county}&key=${API_KEY}`;

  const fetchData = async () => {
    return (await fetch(queryURI)).json();
  };

  const normalizeResults = (data) => {
    const keys = data.shift();

    // convert from array of arrays to array of hashes, keyed by first element
    const hashify = data.map((r) => {
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
  };

  const data = await fetchData();
  const normalizedData = normalizeResults(data);
  const directory = `public/census/${path.split('/').slice(0, -1).join('/')}`;
  const fileName = path.split('/').pop();

  mkdir(directory, { recursive: true }, (e) => {
    if (e) console.log(e);
    writeFile(
      `${directory}/${fileName}.json`,
      JSON.stringify(normalizedData),
      'utf8',
      (e) => {
        if (e) console.log(e);
      }
    );
  });
};

run({
  path: 'data/2020/acs/acs5',
  variables: [
    // total
    'B05003_003E', // https://api.census.gov/data/2020/acs/acs5/variables/B05003_003E.json

    // under 18
    'B05003_014E', // https://api.census.gov/data/2020/acs/acs5/variables/B05003_014E.json
    'B05003_001E', // https://api.census.gov/data/2020/acs/acs5/variables/B05003_001E.json
  ],
});
run({
  path: 'data/2020/dec/pl',
  variables: ['P1_001N'],
});
run({
  path: 'data/2010/dec/pl',
  variables: ['P001001'],
});
run({
  path: 'data/2000/dec/pl',
  variables: ['PL001001'],
});

// sex by age
// B01001_002E
// B01001_003E
// B01001_004E
// B01001_005E
// B01001_006E
// B01001_007E
// B01001_008E
// B01001_009E
// B01001_010E
// B01001_011E
// B01001_012E
// B01001_013E
// B01001_014E
// B01001_015E
// B01001_016E
// B01001_017E
// B01001_018E
// B01001_019E
// B01001_020E
// B01001_021E
// B01001_022E
// B01001_023E
// B01001_024E
// B01001_025E
// B01001_026E
// B01001_027E
// B01001_028E
// B01001_029E
// B01001_030E
// B01001_031E
// B01001_032E
// B01001_033E
// B01001_034E
// B01001_035E
// B01001_036E
// B01001_037E
// B01001_038E
// B01001_039E
// B01001_040E
// B01001_041E
// B01001_042E
// B01001_043E
// B01001_044E
// B01001_045E
// B01001_046E
// B01001_047E
// B01001_048E
// B01001_049E
