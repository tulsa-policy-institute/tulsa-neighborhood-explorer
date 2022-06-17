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

export default filterForProfileTracts;
