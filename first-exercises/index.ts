import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const result = calculateExercises(daily_exercises, Number(target));
  res.json(result);
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

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
