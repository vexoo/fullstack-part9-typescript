import React from 'react';
import { Entry, HealthCheckRating } from '../../types';
import { Icon, List, ListItem, ListItemText } from '@mui/material';
import { Favorite } from '@mui/icons-material';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const ratingIcon = (rating: number) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <Favorite style={{ color: 'green', fontSize: '18px' }} />;
    case HealthCheckRating.LowRisk:
      return <Favorite style={{ color: 'yellow', fontSize: '18px' }} />;
    case HealthCheckRating.HighRisk:
      return <Favorite style={{ color: 'orange', fontSize: '18px' }} />;
    case HealthCheckRating.CriticalRisk:
      return <Favorite style={{ color: 'red', fontSize: '18px' }} />;
    default:
      break;
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          discharge date: {entry.discharge.date} <br />
          criteria: <i>{entry.discharge.criteria}</i>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          Employer: {entry.employerName}
          {entry.sickLeave && (
            <div>
              Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </div>
          )}
        </div>
      );
    case 'HealthCheck':
      return <div>Health rating: {ratingIcon(entry.healthCheckRating)}</div>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
