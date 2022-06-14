import { helper } from '@ember/component/helper';

export default helper(function toFixed([num, places] /*, named*/) {
  return parseFloat(num.toFixed(places));
});
