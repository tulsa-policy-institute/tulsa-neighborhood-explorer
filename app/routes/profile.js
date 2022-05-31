import Route from '@ember/routing/route';

export default class ProfileRoute extends Route {
  model(params) {
    const { neighborhoods } = this.modelFor('application');

    return neighborhoods.find((n) => n.neighborhood === params.id);
  }
}
