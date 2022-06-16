import { helper } from '@ember/component/helper';

export default helper(function divide([a, b] /*, named*/) {
  return a / b;
});
