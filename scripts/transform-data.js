const fs = require('fs');
const path = require('path');

const data = {
  assessments: require(path.resolve('data/assessments.json')),
  boundaries: require(path.resolve('data/nsa_boundaries.json')),
  census: {
    2000: require(path.resolve('data/census/data/2000/dec/pl.json')),
    2010: require(path.resolve('data/census/data/2010/dec/pl.json')),
    2020: require(path.resolve('data/census/data/2020/dec/pl.json')),
  },
};

function filterForProfileTracts([results, tracts]) {
  return results
    .filter((r) => tracts.includes(r['NAME']))
    .reduce((acc, curr) => {
      const estKeys = Object.keys(curr).filter(
        (k) =>
          (k.charAt(k.length - 1) === 'E' && k.includes('_')) || k.includes('P')
      );

      estKeys.forEach((key) => {
        if (acc[key]) {
          acc[key] = acc[key] + parseInt(curr[key]);
        } else {
          acc[key] = parseInt(curr[key]);
        }
      });

      return acc;
    }, {});
}

const transformed = data.assessments.map((assessment) => {
  const feature = data.boundaries.features.find(b => b.properties.map_id === assessment.map_id);
  const normalizedTractIDs = feature.properties.tracts_202
    .split(',')
    .map((id) => parseFloat(id.trim()).toString());

  return {
    ...assessment,

    normalizedTractIDs: normalizedTractIDs,
    census2000: filterForProfileTracts([
      data.census[2000],
      normalizedTractIDs,
    ]),
    census2010: filterForProfileTracts([
      data.census[2010],
      normalizedTractIDs,
    ]),
    census2020: filterForProfileTracts([
      data.census[2020],
      normalizedTractIDs,
    ]),
  };
});

fs.writeFileSync(path.resolve('data/assessments.json'), JSON.stringify(transformed, null, 2));
fs.writeFileSync(path.resolve('data/assessments.min.json'), JSON.stringify(transformed));
