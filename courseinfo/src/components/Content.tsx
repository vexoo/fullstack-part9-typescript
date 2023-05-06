import Part from './Part';
import { CoursePart } from '../CourseParts';

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <div>
      {parts.map((part, index) => (
        <p key={index}>
          <strong>{part.name} {part.exerciseCount}</strong>
          <Part part={part} />
        </p>
      ))}
    </div>
  );
};

export default Content;
