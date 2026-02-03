import { useParams } from "react-router-dom";

const PlaceBid = () => {
  const { id } = useParams();

  return (
    <>
    <div>
      <h1>Árverés részletei teszt – ID: {id}</h1>
    </div>
    <h1>cica</h1>
    </>
  );
};

export default PlaceBid;
