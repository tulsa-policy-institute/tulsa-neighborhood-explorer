import { module, test } from 'qunit';
import { setupTest } from 'tulsa-neighborhood-explorer/tests/helpers';

module('Unit | Service | main-map', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:main-map');
    assert.ok(service);
  });
});
