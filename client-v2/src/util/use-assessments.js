import useSWR from 'swr';
import dasherize from './dasherize';
import { fetcher } from './fetcher';
import filterForProfileTracts from './filterForProfileTracts';

const ASSESSMENTS_URL = 'https://raw.githubusercontent.com/tulsa-policy-institute/tulsa-neighborhood-explorer/master/data/assessments.min.json';

const mergeCensusData = (assessments, census2000, census2010, census2020) => {
  return assessments.map((assessment) => {
    console.log(assessment);
    const normalizedTractIDs = assessment.tracts_202
      .split(',')
      .map((id) => parseFloat(id.trim()).toString());

    return {
      ...assessment,

      normalizedTractIDs,
      census2000: filterForProfileTracts([
        census2000,
        normalizedTractIDs,
      ]),
      census2010: filterForProfileTracts([
        census2010,
        normalizedTractIDs,
      ]),
      census2020: filterForProfileTracts([
        census2020,
        normalizedTractIDs,
      ]),
    };
  })
}

export const useAssessments = (id) => {
  let { data: assessments, error } = useSWR(ASSESSMENTS_URL, fetcher);

  const { data: census2000 } =  useSWR('/census/data/2000/dec/pl.json');
  const { data: census2010 } =  useSWR('/census/data/2010/dec/pl.json');
  const { data: census2020 } =  useSWR('/census/data/2020/dec/pl.json');

  if (assessments) {
    assessments = mergeCensusData(assessments, census2000, census2010, census2020);
  }

  return {
    assessments,
    isLoading: !error && !assessments,
    isError: error
  }
}
