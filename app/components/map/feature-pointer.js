import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FeaturePointer extends Component {
  updateMapCursor(map, to = '') {
    map.getCanvas().style.cursor = to;
  }

  @action
  onLayerHover(e) {
    const { instance: map } = this.args.map;

    if (hasFeatures(e.features)) {
      this.updateMapCursor(map, 'pointer');
    }
  }

  @action
  onLayerMouseOut() {
    const { instance: map } = this.args.map;

    this.updateMapCursor(map, '');
  }
}

const hasFeatures = (features) => {
  return features.length > 0;
};
