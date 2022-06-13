import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import config from '../config/environment';

const { environment } = config;

export default class ProfileController extends Controller {
  @service
  mainMap;

  showAssessment = environment === 'development' ? true : false;

  queryParams = ['showAssessment'];

  dictionary = {
    lu_1: 'Access to Schools',
    lu_2: 'Access to Healthcare',
    lu_3: 'Access to Social Services',
    lu_4: 'Access to Financial Services ',
    lu_5: 'Access to Eating Places ',
    lu_6: 'Access to Libraries',
    lu_7: 'Access to Parks ',
    lu_8: 'Access to Retail',
    lu_9: 'Access to Service and Social Clubs',
    lu_10: 'Access to Places of Worship',
    lu_11: 'Access to Arts & Entertainment Venues',
    lu_12: 'Access to Healthy Food Sources',
  };

  keys = Object.keys(this.dictionary);
}
