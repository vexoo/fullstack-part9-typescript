import axios from 'axios';
import { useState, useEffect } from 'react';
import diaryService from './services/diaries';
import { DiaryEntry, DiaryFormValues } from './types';
import NewDiaryForm from './components/NewDiaryForm';
import { Alert } from '@mui/material';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    diaryService.getAll().then((diaries) => setDiaries(diaries));
  }, []);

  const setNotif = (timer: number) => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setError('');
    }, timer * 1000);
  };

  const submitNewPatient = async (values: DiaryFormValues) => {
    try {
      const diary = await diaryService.create(values);
      setDiaries(diaries.concat(diary));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setNotif(5);
        } else {
          setError('Unrecognized axios error');
          setNotif(5);
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
        setNotif(5);
      }
    }
  };

  console.log(diaries);

  return (
    <div>
      <h2>Add a new entry</h2>
      {showAlert && <Alert severity="error">{error}</Alert>}
      <NewDiaryForm onSubmit={submitNewPatient} />
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <b>{diary.date}</b>
          <p>
            visibility: {diary.visibility} <br />
            weather: {diary.weather}
            <br />
            {diary.comment && <i>{diary.comment}</i>}
          </p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default App;
