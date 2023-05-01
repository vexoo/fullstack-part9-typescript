import diagnosisData from '../../data/diagnoses';

import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
  return diagnosisData;
};

export default {
  getEntries
};
