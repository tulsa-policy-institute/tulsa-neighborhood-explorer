import { helper } from '@ember/component/helper';

export default helper(function run([service, func, arg]) {
  service[func](arg);
});
