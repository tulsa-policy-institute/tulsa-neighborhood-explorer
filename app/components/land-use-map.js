import Component from '@glimmer/component';
import { action } from '@ember/object';
import intersects from '@turf/boolean-intersects';
import { tracked } from '@glimmer/tracking';

const colors = [
  'match',
  ['get', 'LandUse'],
  'Park and Open Space', 'rgba(56, 168, 0, 255)',
  'Trail District', 'rgba(211, 255, 190, 255)',
  'Downtown', 'rgba(0, 77, 168, 255)',
  'Downtown Neighborhood', 'rgba(205, 170, 102, 255)',
  'Main Street', 'rgba(255, 0, 197, 255)',
  'Mixed-Use Corridor', 'rgba(255, 115, 223, 255)',
  'Regional Center', 'rgba(255, 0, 0, 255)',
  'Town Center', 'rgba(197, 0, 255, 255)',
  'Neighborhood Center', 'rgba(115, 0, 0, 255)',
  'Employment', 'rgba(122, 182, 245, 255)',
  'New Neighborhood', 'rgba(255, 255, 115, 255)',
  'Existing Neighborhood', 'rgba(255, 255, 190, 255)',
  'Arkansas River Corridor', 'rgba(0, 197, 255, 255)',
  /* other */ '#ccc',
];

export default class LandUseMapComponent extends Component {
  @tracked
  distribution;

  colors = colors;

  get source() {
    return {
      type: 'vector',
      tiles: [
        'pmtiles://https://storage.googleapis.com/tpi-pmtiles/landuse.pmtiles/{z}/{x}/{y}',
      ],
    };
  }

  @action
  handleClick(e) {
    const [feature] = e.features;

    console.log(feature);
  }

  @action
  aggregate(e) {
    const { features } = e;
    const neighborhoodFeatures = features.filter((f) => {
      return intersects(this.args.feature, f.geometry);
    });

    const group = neighborhoodFeatures.reduce((r, a) => {
      r[a.properties['LandUse']] = [...(r[a.properties['LandUse']] || []), a];
      return r;
    }, {});

    this.distribution = Object.entries(group)
      .map((grouping, idx, array) => {
        const totalArea = grouping[1].reduce((acc, curr) => acc + curr.properties['Shape__Area'], 0);

        return [grouping[0], totalArea];
      })
      .map((grouping, idx, array) => {
        const total = array.reduce((acc, curr) => acc + curr[1], 0);
        const categoryColor = colors[colors.findIndex(el => el === grouping[0]) + 1];

        return [...grouping, (grouping[1] / total * 100).toFixed(0), categoryColor];
      })
      .sort((a, b) => b[1] - a[1]);
  }
}
