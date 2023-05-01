interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const slicedArgs = process.argv.slice(2);

  if (slicedArgs.every((arg) => !isNaN(Number(arg)))) {
    return {
      target: Number(slicedArgs[0]),
      hours: slicedArgs.slice(1).map(Number)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (
  hours: Array<number>,
  target: number
): ExerciseResult => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((nonZero) => nonZero > 0).length;
  const sum = hours.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const average = sum / periodLength;
  const success = average >= target;
  let rating = 0;
  let ratingDescription = '';

  if (average < target * 0.5) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average >= target * 0.5 && average < target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (average >= target) {
    rating = 3;
    ratingDescription = 'good job, keep it up';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, hours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
}
