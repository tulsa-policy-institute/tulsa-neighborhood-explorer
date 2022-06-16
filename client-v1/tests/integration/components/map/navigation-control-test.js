import { module, test } from 'qunit';
import { setupRenderingTest } from 'tulsa-neighborhood-explorer/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | map/navigation-control', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Map::NavigationControl />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Map::NavigationControl>
        template block text
      </Map::NavigationControl>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
