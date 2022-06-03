import { helper } from '@ember/component/helper';

export default helper(function formatNumber([num]) {
  return num.toLocaleString();
});
