import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import ConfirmDelete from "../common/ConfirmDelete";

import { getOne, remove } from "../../services/pets";
import { useAuthContext } from "../../contexts/AuthContext";

function PetDetails() {
  const {
    user: { _id: userId, accessToken },
  } = useAuthContext();

  const { petId } = useParams();

  const navigate = useNavigate();

  const [pet, setPet] = useState({});
  const [showModalDialog, setShowModalDialog] = useState(false);

  useEffect(() => {
    async function getPet() {
      const currentPet = await getOne(petId);
      setPet(currentPet);
    }

    getPet();
  }, [petId]);

  async function petDeleteHandler() {
    await remove(petId, accessToken);
    setShowModalDialog(false);
    navigate("/");
  }

  function showDialogHandler() {
    setShowModalDialog(true);
  }

  const ownerButtons = (
    <>
      <Link className="button" to={`/pets/edit/${petId}`}>
        Edit
      </Link>
      <button className="button" onClick={showDialogHandler}>
        Delete
      </button>
    </>
  );

  const userButtons = (
    <a className="button" href="#">
      Like
    </a>
  );

  return (
    <>
      <ConfirmDelete
        showDialog={showModalDialog}
        onDelete={petDeleteHandler}
        onClose={() => setShowModalDialog(false)}
      />
      <section id="details-page" className="details">
        <div className="pet-information">
          <h3>Name: {pet.name}</h3>
          <p className="type">Type: {pet.type}</p>
          <p className="img">
            <img src={pet.imageUrl} />
          </p>

          <div className="actions">
            {userId && (userId === pet._ownerId ? ownerButtons : userButtons)}

            <div className="likes">
              <img className="hearts" src="/images/heart.png" />
              <span id="total-likes">Likes: {pet.likes?.length}</span>
            </div>
          </div>
        </div>

        <div className="pet-description">
          <h3>Description:</h3>
          <p>{pet.description}</p>
        </div>
      </section>
    </>
  );
}

export default PetDetails;
