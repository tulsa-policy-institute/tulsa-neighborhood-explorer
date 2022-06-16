import Component from '@glimmer/component';
import { action } from '@ember/object';
import intersects from '@turf/boolean-intersects';
import { tracked } from '@glimmer/tracking';

export default class LandUseMapComponent extends Component {
  @tracked
  distribution;

  @tracked
  popupCoordinates = null;

  colors = {
    schools: 'rgba(0, 77, 168, 255)',
    libraries: 'rgba(255, 127, 127, 255)',
    recreation: 'rgba(197, 0, 255, 255)',
    parks: 'rgba(197, 0, 255, 255)',
    'tmapc-cases': 'purple',
    'boa-cases': 'purple',
  };

  sources = [
    [
      'schools',
      'https://map9.incog.org/arcgis9wa/rest/services/Tulsa_Area_Schools/FeatureServer/2/query?where=(1=1)&outfields=*&f=geojson',
    ],
    [
      'libraries',
      'https://map9.incog.org/arcgis9wa/rest/services/Tulsa_Area_Libraries/FeatureServer/0/query?where=(1=1)&outfields=*&f=geojson',
    ],
    [
      'recreation',
      'https://map9.incog.org/arcgis9wa/rest/services/Rec_Centers/FeatureServer/3/query?where=(1=1)&outfields=*&f=geojson',
    ],
    [
      'parks',
      'https://opendata.arcgis.com/api/v3/datasets/7c9e920124d941cfa449365b1838d88b_0/downloads/data?format=geojson&spatialRefId=4326',
    ],
    [
      'tmapc-cases',
      'https://map9.incog.org/arcgis9wa/rest/services/TMAPC_PendingCases/FeatureServer/0/query?where=(1=1)&outfields=*&f=geojson',
    ],
    [
      'boa-cases',
      'https://map9.incog.org/arcgis9wa/rest/services/BOA_PendingCases/FeatureServer/0/query?where=(1=1)&outfields=*&f=geojson',
    ],
  ];

  @action
  aggregate(e) {
    const { target: map } = e;

    const targetLayerIds = this.sources.map((s) => s[0]);
    const features = map.queryRenderedFeatures({ layers: targetLayerIds });
    const neighborhoodFeatures = features
      .filter((f) => targetLayerIds.includes(f.layer.id))
      .filter((f) => {
        return intersects(this.args.feature, f.geometry);
      });

    const group = neighborhoodFeatures.reduce((r, a) => {
      r[a.layer.id] = [...(r[a.layer.id] || []), a];
      return r;
    }, {});

    this.distribution = Object.entries(group)
      .map((grouping) => {
        return [grouping[0], grouping[1].length];
      })
      .map((grouping) => {
        return [...grouping, this.colors[grouping[0]]];
      })
      .sort((a, b) => b[1] - a[1]);
  }

  @action
  hovered(e) {
    this.popupCoordinates = e;
  }

  @action
  mouseleave() {
    this.popupCoordinates = null;
  }
}
