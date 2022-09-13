import Component from '@glimmer/component';
import { action } from '@ember/object';
import * as d3 from 'd3';
import { tracked } from '@glimmer/tracking';

export default class RankingCircle extends Component {
  @tracked
  value = 0;

  @action
  radialProgress(selector) {
    this.parent = d3.select(selector);
    this.size = this.parent.node().getBoundingClientRect();
    this.svg = this.parent
      .append('svg')
      .attr('width', this.size.width)
      .attr('height', this.size.height);
    this.outerRadius = Math.min(this.size.width, this.size.height) * 0.45;
    this.thickness = 12;

    this.mainArc = d3
      .arc()
      .startAngle(0)
      .endAngle(Math.PI * 2)
      .innerRadius(this.outerRadius - this.thickness)
      .outerRadius(this.outerRadius);

    this.svg
      .append('path')
      .attr('class', 'progress-bar-bg')
      .attr(
        'transform',
        `translate(${this.size.width / 2},${this.size.height / 2})`
      )
      .attr('d', this.mainArc());

    this.mainArcPath = this.svg
      .append('path')
      .attr('fill', this.args.barColor || 'green')
      .attr(
        'transform',
        `translate(${this.size.width / 2},${this.size.height / 2})`
      );

    this.svg
      .append('circle')
      .attr('fill', this.args.barColor || 'green')
      .attr(
        'transform',
        `translate(${this.size.width / 2},${
          this.size.height / 2 - this.outerRadius + this.thickness / 2
        })`
      )
      .attr('width', this.thickness)
      .attr('height', this.thickness)
      .attr('r', this.thickness / 2);

    this.end = this.svg
      .append('circle')
      .attr('fill', this.args.barColor || 'green')
      .attr(
        'transform',
        `translate(${this.size.width / 2},${
          this.size.height / 2 - this.outerRadius + this.thickness / 2
        })`
      )
      .attr('width', this.thickness)
      .attr('height', this.thickness)
      .attr('r', this.thickness / 2);

    this.percentLabel = this.svg
      .append('text')
      .attr('class', 'progress-label')
      .attr(
        'transform',
        `translate(${this.size.width / 2},${this.size.height / 2})`
      )
      .text('0');

    this.update();
  }

  @action
  update() {
    const progressPercent = (this.args.value / 5) * 100;
    const startValue = this.value;
    const startAngle = (Math.PI * startValue) / 50;
    const angleDiff = (Math.PI * progressPercent) / 50 - startAngle;
    const startAngleDeg = (startAngle / Math.PI) * 180;
    const angleDiffDeg = (angleDiff / Math.PI) * 180;
    const transitionDuration = 750;

    this.mainArcPath
      .transition()
      .duration(transitionDuration)
      .attrTween('d', () => {
        return (t) => {
          this.mainArc.endAngle(startAngle + angleDiff * t);
          return this.mainArc();
        };
      });

    this.end
      .transition()
      .duration(transitionDuration)
      .attrTween('transform', () => {
        return (t) => {
          return (
            `translate(${this.size.width / 2},${this.size.height / 2})` +
            `rotate(${startAngleDeg + angleDiffDeg * t})` +
            `translate(0,-${this.outerRadius - this.thickness / 2})`
          );
        };
      });

    this.percentLabel.text(this.args.value?.toFixed(1));

    // this.percentLabel
    //   .transition()
    //   .duration(transitionDuration)
    //   .tween('bla', () => {
    //     return (t) => {

    //     };
    //   });

    this.value = progressPercent;
  }
}

// let chart = radialProgress('.widget')
// let progress = [100,0,5,20,35,70,90,100,0]
// let state = 0
// d3.interval(function(){
//   chart.update(progress[state])
//   state = (state + 1) % progress.length
// }, 2000)
