import PetCard from "../PetCard";

function PetsList({ pets }) {
  return (
    <ul className="other-pets-list">
      {pets.map((p) => (
        <PetCard key={p._id} pet={p} />
      ))}
    </ul>
  );
}

export default PetsList;
