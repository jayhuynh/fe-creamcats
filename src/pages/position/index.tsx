import { useParams } from 'react-router-dom';

interface ParamsTypes {
  positionId: string;
}

const Position = () => {
  const { positionId } = useParams<ParamsTypes>();
  return (<div>This is the detail of position {positionId}</div>);
};

export default Position;
