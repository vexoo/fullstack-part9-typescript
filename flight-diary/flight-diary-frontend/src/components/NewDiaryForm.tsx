import { useState } from 'react';
import { DiaryFormValues, Visibility, Weather } from '../types';

interface Props {
  onSubmit: (values: DiaryFormValues) => void;
}

const NewDiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const addPatient = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      visibility,
      weather,
      comment
    });
    setComment('');
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          Visibility:{' '}
          {Object.values(Visibility).map((option) => (
            <label key={option}>
              {option}
              <input
                type="radio"
                name="visibility"
                value={option}
                onChange={(e) => setVisibility(e.target.value)}
              />
            </label>
          ))}
        </div>
        <div>
          Weather:{' '}
          {Object.values(Weather).map((option) => (
            <label key={option}>
              {option}
              <input
                type="radio"
                name="weather"
                value={option}
                onChange={(e) => setWeather(e.target.value)}
              />
            </label>
          ))}
        </div>
        <div>
          <label>
            Comment:
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;
