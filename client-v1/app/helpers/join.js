import { helper } from '@ember/component/helper';

export default helper(function join([array, sep] /*, named*/) {
  return array.join(sep);
});
