import { useState, useEffect } from 'react';
import { Diagnosis, Entry } from '../../types';
import { Icon, List, ListItem, ListItemText } from '@mui/material';
import { LocalHospital, MedicalServices, Work } from '@mui/icons-material';
import diagnosisService from '../../services/diagnoses';
import EntryDetails from './EntryDetails';

const PatientEntriesList = ({ entries }: { entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<{ [code: string]: string }>({});

  let diagnosisMap: { [code: string]: string };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diags = await diagnosisService.getAll();
      diagnosisMap = diags.reduce(
        (map: { [code: string]: string }, diagnosis) => {
          map[diagnosis.code] = diagnosis.name;
          return map;
        },
        {}
      );
      setDiagnoses(diagnosisMap);
    };
    void fetchDiagnoses();
  }, []);

  if (!diagnoses) {
    return <div>Loading...</div>;
  }

  console.log(diagnoses);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Hospital':
        return <LocalHospital />;
      case 'OccupationalHealthcare':
        return <Work />;
      case 'HealthCheck':
        return <MedicalServices />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3>Entries</h3>
      {entries.map((entry) => (
        <div key={entry.id}>
          <div>
            <strong>
              {entry.date} {getIcon(entry.type)}
            </strong>
          </div>
          <div>
            <i>{entry.description}</i>
          </div>
          {entry.diagnosisCodes && (
            <ul>
              <div>Diagnoses:</div>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {diagnoses[code]}
                </li>
              ))}
            </ul>
          )}
          <EntryDetails entry={entry} />
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default PatientEntriesList;
