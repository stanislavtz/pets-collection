import { useState, useEffect } from "react";
import { getAll } from "../../services/pets";

import PetCard from "../PetCard";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPets() {
      setLoading(true);

      const allPets = await getAll();

      if (allPets.message) {
        setError(allPets.message);
      } else {
        setPets(allPets);
      }

      setLoading(false);
    }

    getPets();
  }, []);

  return (
    <section id="dashboard-page" className="dashboard">
      <h1>Dashboard</h1>
      {loading && <p className="no-pets">Loading...</p>}

      {!loading && error && (
        <p className="no-pets">Something went wrong. Try again later!</p>
      )}

      {!loading && pets.length > 0 && (
        <ul className="other-pets-list">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </ul>
      )}

      {!loading && !error && pets.length === 0 && (
        <p className="no-pets">No pets in database!</p>
      )}
    </section>
  );
}

export default Dashboard;
