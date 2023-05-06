import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Entry, NewPatient, Patient, NonSensitivePatient, EntryWithoutId } from '../types';

const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patientData.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = { id, ...patient };
  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = getPatientById(id);
  if (!patient) {
    throw new Error("Unable to find patient");
  }
  const newEntry = { ...entry, id: uuid() };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
  addEntry
};
