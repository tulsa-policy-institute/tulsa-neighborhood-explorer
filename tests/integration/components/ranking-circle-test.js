import { module, test } from 'qunit';
import { setupRenderingTest } from 'tulsa-neighborhood-explorer/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ranking-circle', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<RankingCircle />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <RankingCircle>
        template block text
      </RankingCircle>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
