import { module, test } from 'qunit';
import { setupTest } from 'tulsa-neighborhood-explorer/tests/helpers';

module('Unit | Controller | profile', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:profile');
    assert.ok(controller);
  });
});
