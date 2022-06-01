import Component from '@glimmer/component';

export default class RankingCircle extends Component {
  get valueInDegrees() {
    return (this.args.value / 5) * 180;
  }
}
