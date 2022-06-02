import { helper } from '@ember/component/helper';

export default helper(function filterForProfileTracts([results, tracts]) {
  return results.filter((r) => {
    return tracts.includes(r['NAME']);
  });
});
