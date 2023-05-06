import {
  NewPatient,
  Gender,
  EntryWithoutId,
  Diagnosis,
  newBaseEntry,
  Entry,
  Discharge,
  HealthCheckRating,
  SickLeave
} from './types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isDateOfBirth = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDateOfBirth(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender ' + gender);
  }
  return gender;
};

const isType = (type: unknown): type is Entry['type'] => {
  switch (type as Entry['type']) {
    case 'Hospital':
    case 'HealthCheck':
    case 'OccupationalHealthcare':
      return true;
    default:
      return false;
  }
};

const parseType = (type: unknown): string => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge) {
    throw new Error('Incorrect or missing discharge data');
  }
  const { date, criteria } = discharge as Discharge;
  if (!date || !isString(date) || !isDateOfBirth(date)) {
    throw new Error('Incorrect or missing discharge date: ' + date);
  } else if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing discharge criteria: ' + criteria);
  }
  return { date, criteria };
};

export const isNumber = (value: unknown): value is number => {
  return !Number.isNaN(Number(value));
};

export const isHealthCheckRating = (value: any): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(Number(value));
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      'Incorrect or missing health check rating: ' + healthCheckRating
    );
  }
  return Number(healthCheckRating);
};

const parseEmployer = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing employer name: ' + name);
  }
  return name;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  const { startDate, endDate } = sickLeave as SickLeave;
  if (!startDate && !endDate) {
    return undefined;
  } else if (!startDate || !isString(startDate) || !isDateOfBirth(startDate)) {
    throw new Error('Incorrect or missing sick leave start date: ' + startDate);
  } else if (!endDate || !isString(endDate) || !isDateOfBirth(endDate)) {
    throw new Error('Incorrect or missing sick leave end date: ' + endDate);
  }
  return { startDate, endDate };
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

export const toNewEntry = (entry: any): EntryWithoutId => {
  const baseEntry: newBaseEntry = {
    description: parseDescription(entry.description),
    date: parseDateOfBirth(entry.date),
    specialist: parseName(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry?.diagnosisCodes)
  };

  const type = parseType(entry.type) as Entry['type'];

  switch (type) {
    case 'Hospital':
      return {
        ...baseEntry,
        type,
        discharge: parseDischarge(entry.discharge)
      };
    case 'HealthCheck':
      return {
        ...baseEntry,
        type,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type,
        employerName: parseEmployer(entry.employerName),
        sickLeave: parseSickLeave(entry?.sickLeave)
      };
    default:
      return assertNever(type);
  }
};

export default toNewPatient;
