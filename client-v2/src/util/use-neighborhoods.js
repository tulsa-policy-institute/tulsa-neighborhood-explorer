import useSWR from 'swr';
import { fetcher } from './fetcher';

const NEIGHBORHOODS_URL = 'https://raw.githubusercontent.com/tulsa-policy-institute/tulsa-neighborhood-explorer/master/data/neighborhoods.min.json';

export const useNeighborhoods = (id) => {
  let { data: neighborhoods, error } = useSWR(NEIGHBORHOODS_URL, fetcher);

  return {
    neighborhoods,
    isLoading: !error && !neighborhoods,
    isError: error
  }
}
