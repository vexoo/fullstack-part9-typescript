import { CoursePart } from '../CourseParts';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );
    case 'group':
      return <div>Project exercises: {part.groupProjectCount}</div>;
    case 'background':
      return (
        <div>
          <i>{part.description}</i>
          <br />
          background material: {part.backgroundMaterial}
        </div>
      );
    case 'requirements':
      return (
        <div>
          <i>{part.description}</i>
          <br />
          prerequisite skills: {part.requirements.join(', ')}
        </div>
      );
    default:
      return assertNever(part);
  }
};
export default Part;
