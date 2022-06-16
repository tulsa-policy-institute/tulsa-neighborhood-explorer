import Component from '@glimmer/component';
import { action } from '@ember/object';
import intersects from '@turf/boolean-intersects';
import { tracked } from '@glimmer/tracking';
import area from '@turf/area';
import areaIntersect from '@turf/intersect';

const colors = [
  'match',
  ['get', 'LEGEND'],
  'Agrictulture',
  'rgba(85, 255, 0, 255)',
  'Agriculture',
  'rgba(85, 255, 0, 255)',
  'Agricultural-Residential',
  'rgba(163, 255, 115, 255)',
  'Central Business District',
  'rgba(255, 190, 190, 255)',
  'Commercial',
  'rgba(255, 127, 127, 255)',
  'Commercial Shopping',
  'rgba(255, 127, 127, 255)',
  'Commercial-High',
  'rgba(255, 127, 127, 255)',
  'Corridor',
  'rgba(255, 190, 190, 255)',
  'Flood District',
  'rgba(190, 210, 255, 255)',
  'Industiral',
  'rgba(204, 204, 204, 255)',
  'Industrial',
  'rgba(204, 204, 204, 255)',
  'Master Planned Development',
  'rgba(132, 0, 168, 255)',
  'Master Planned Development-Form-Based Code',
  'rgba(232, 190, 255, 255)',
  'Mixed-Use',
  'rgba(115, 255, 223, 255)',
  'Office',
  'rgba(255, 211, 127, 255)',
  'Office Medium',
  'rgba(255, 211, 127, 255)',
  'Parking',
  'rgba(255, 170, 0, 255)',
  'Public Facilities',
  'rgba(115, 223, 255, 255)',
  'Residential Multi-Family',
  'rgba(205, 170, 102, 255)',
  'Residential Multie-Family',
  'rgba(205, 170, 102, 255)',
  'Residential Single-Family',
  'rgba(255, 255, 190, 255)',
  'Residential-Single Family',
  'rgba(255, 255, 190, 255)',
  'Scientific Research',
  'rgba(230, 0, 169, 255)',
  /* other */ '#ccc',
];

export default class LandUseMapComponent extends Component {
  @tracked
  distribution;

  colors = colors;

  get source() {
    return {
      type: 'vector',
      maxzoom: 11,
      tiles: [
        'pmtiles://https://storage.googleapis.com/tpi-pmtiles/zoning.pmtiles/{z}/{x}/{y}',
      ],
    };
  }

  @action
  aggregate(e) {
    const { features } = e;

    const neighborhoodFeatures = features.filter((f) => {
      return intersects(this.args.feature, f.geometry);
    });

    const group = neighborhoodFeatures.reduce((r, a) => {
      r[a.properties['LEGEND']] = [...(r[a.properties['LEGEND']] || []), a];
      return r;
    }, {});

    this.distribution = Object.entries(group)
      .map((grouping) => {
        const totalArea = grouping[1].reduce(
          (acc, curr) =>
            acc + area(areaIntersect(curr.geometry, this.args.feature)),
          0
        );

        return [grouping[0], totalArea];
      })
      .map((grouping, _idx, array) => {
        const total = array.reduce((acc, curr) => acc + curr[1], 0);
        const categoryColor =
          colors[colors.findIndex((el) => el === grouping[0]) + 1];

        return [
          ...grouping,
          ((grouping[1] / total) * 100).toFixed(0),
          categoryColor,
        ];
      })
      .sort((a, b) => b[1] - a[1]);
  }
}
