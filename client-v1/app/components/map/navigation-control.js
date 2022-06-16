import Component from '@glimmer/component';
import maplibregl from 'maplibre-gl';

export default class MapNavigationControlComponent extends Component {
  constructor(...args) {
    super(...args);

    this.args.map.addControl(this.nav, this.args.position || 'top-right');
  }

  nav = new maplibregl.NavigationControl();
}
