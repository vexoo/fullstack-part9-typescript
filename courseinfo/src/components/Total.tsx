interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Total = ({ parts }: { parts: ContentProps[] }): JSX.Element => {
  return (
    <div>
      <p>
        Total number of exercises:{' '}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
