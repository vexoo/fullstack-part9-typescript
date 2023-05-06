import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Female, Male, Transgender } from '@mui/icons-material';
import { Patient, Gender, EntryFormValues } from '../../types';
import patientService from '../../services/patients';
import PatientEntriesList from './PatientEntriesList';
import AddEntryModal from '../AddEntryModal';
import { Button } from '@mui/material';

const PatientListPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    
		return null;
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getSpecific(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, []);

  const GenderIcon = ({ gender }: { gender: Gender }) => {
    if (gender === Gender.Male) {
      return <Male />;
    } else if (gender === Gender.Female) {
      return <Female />;
    } else {
      return <Transgender />;
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h2>
      <div>ssh: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div>date of birth: {patient.dateOfBirth}</div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        New entry
      </Button>
      <PatientEntriesList entries={patient.entries} />
    </div>
  );
};
export default PatientListPage;
