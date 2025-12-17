import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import ConfirmDelete from "../common/ConfirmDelete";

import {
  getLikes,
  likePet,
  getOne,
  remove,
  getUserLike,
} from "../../services/pets";

import { useAuthContext } from "../../contexts/AuthContext";

function PetDetails() {
  const [pet, setPet] = useState({});
  const [petLikes, setPetLikes] = useState(0);
  const [userLike, setUserLike] = useState(0);
  const [showModalDialog, setShowModalDialog] = useState(false);

  const {
    user: { _id: userId, accessToken },
  } = useAuthContext();

  const { petId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function getPet() {
      const currentPet = await getOne(petId);
      setPet(currentPet);
    }

    getPet();
  }, [petId]);

  useEffect(() => {
    async function getPetLikes() {
      const likes = await getLikes(pet._id, pet._ownerId);
      setPetLikes(likes);
    }

    getPetLikes();
  }, [pet]);

  useEffect(() => {
    async function getUserLikeCount() {
      const like = await getUserLike(petId, userId);
      setUserLike(like);
    }

    getUserLikeCount();
  }, [petId, userId]);

  async function petDeleteHandler() {
    await remove(petId, accessToken);
    setShowModalDialog(false);
    navigate("/");
  }

  function showDialogHandler() {
    setShowModalDialog(true);
  }

  async function likeClickHandler() {
    await likePet(petId, accessToken);

    setPetLikes((likes) => likes + 1);
    setUserLike(1);
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
    <button className="button" onClick={likeClickHandler}>
      Like
    </button>
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
            {userId &&
              (userId === pet._ownerId
                ? ownerButtons
                : userLike === 0
                ? userButtons
                : null)}

            <div className="likes">
              <img className="hearts" src="/images/heart.png" />
              <span id="total-likes">Likes: {petLikes}</span>
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
