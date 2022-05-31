import EmberRouter from '@ember/routing/router';
import config from 'tulsa-neighborhood-explorer/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('profile', { path: '/profiles/:id' });
});
