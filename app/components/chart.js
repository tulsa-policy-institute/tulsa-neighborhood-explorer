import Component from '@glimmer/component';
import bb from 'billboard.js';
import { action } from '@ember/object';

export default class ChartComponent extends Component {
  get categories() {
    return this.args.data.filter(d => d.value).map(d => d.year);
  }

  get data() {
    return ['Population', ...this.args.data.map(d => d.value).filter(Boolean)];
  }

  @action
  loadChart() {
    this.chart = bb.generate({
      tooltip: { show: false },
      data: {
        columns: [
          this.data
        ],
        type: 'line',
        labels: {
          format: {
            Population: (x, id, i) => `${this.categories[i]}: ${x.toLocaleString()}`,
          },
          colors: {
            Population: 'black',
          },
        },
      },
      axis: {
        x: {
          show: false,
          padding: 0.3,
        },
        y: {
          show: false,
          padding: 30,
        },
      },
      legend: {
        show: false,
      },
      bindto: '#line',
    });
  }

  @action
  updateChart() {
    try {
      this.chart.load({
        columns: [this.data],
      });
    } catch (e) {
      console.log(e);
    }
  }
}
