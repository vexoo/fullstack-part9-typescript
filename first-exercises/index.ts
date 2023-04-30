import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const value3: any = 3;

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  }
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
