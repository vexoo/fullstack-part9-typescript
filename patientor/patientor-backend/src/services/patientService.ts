import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatient, Patient, PatientWithoutSsn } from '../types';

const getEntries = (): Patient[] => {
  return patientData;
};

const getEntriesOmitSsn = (): PatientWithoutSsn[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = { id, ...patient };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getEntriesOmitSsn,
  addPatient
};
