import { useState, useEffect } from "react";

import { useAuthContext } from "../../contexts/AuthContext";
import { getAllMyPets } from "../../services/pets";

import PetsList from "../PetsList";

function MyPets() {
  const [myPets, setMyPets] = useState([]);
  const { user } = useAuthContext();

  const userId = user._id;

  useEffect(() => {
    async function getMyPets() {
      const petsData = await getAllMyPets(userId);
      setMyPets(petsData);
    }

    getMyPets();
  }, [userId]);

  return (
    <section id="my-pets-page" className="my-pets">
      <h1>My Pets</h1>

      <PetsList pets={myPets} />

      {myPets.length === 0 && <p className="no-pets">No pets in database!</p>}
    </section>
  );
}

export default MyPets;
