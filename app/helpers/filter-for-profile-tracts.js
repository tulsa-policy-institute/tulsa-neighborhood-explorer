import { helper } from '@ember/component/helper';

export default helper(function filterForProfileTracts([results, tracts]) {
  console.log(tracts);
  return results
    .filter((r) => tracts.includes(r['NAME']))
    .reduce((acc, curr) => {
      const estKeys = Object.keys(curr).filter(
        (k) => k.charAt(k.length - 1) === 'E' && k.includes('_')
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
});
