import { helper } from '@ember/component/helper';

export default helper(function gt([a, b] /*, named*/) {
  return a > b;
});
