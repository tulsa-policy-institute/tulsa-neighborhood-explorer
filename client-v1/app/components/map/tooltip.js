import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MapTooltipComponent extends Component {
  hoveredFeature = null;

  @action
  onLayerHover(e) {
    console.log(e);
    const { target: map } = e;

    // map.queryRenderedFeatures()
  }

  @action
  onLayerMouseOut() {}
}
