import Component from '@glimmer/component';
import bb from 'billboard.js';
import { action } from '@ember/object';

const calculateChange = (original, next) => {
  const percentage = (((original - next) / original) * 100).toFixed();

  return `(${percentage}%)`;
};

export default class ChartComponent extends Component {
  get categories() {
    return this.args.data.filter((d) => d.value).map((d) => d.year);
  }

  get data() {
    return [
      'Population',
      ...this.args.data.map((d) => d.value).filter(Boolean),
    ];
  }

  @action
  loadChart() {
    this.chart = bb.generate({
      tooltip: { show: false },
      data: {
        columns: [this.data],
        type: 'spline',
        labels: {
          format: {
            Population: (x, id, i, test) => {
              const [, ...all] = this.data;
              let change = all[i - 1]
                ? calculateChange(all[i], all[i - 1])
                : '';

              return `${this.categories[i]}: ${x.toLocaleString()} ${change}`;
            },
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
          padding: 35,
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
