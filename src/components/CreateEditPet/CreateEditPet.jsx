import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

import { create, edit, getOne } from "../../services/pets";

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "imageUrl":
      return { ...state, imageUrl: action.payload };
    case "type":
      return { ...state, type: action.payload };
    default:
      return { ...state };
  }
}

function CreatePet() {
  const {
    user: { accessToken: token },
  } = useAuthContext();

  const { petId } = useParams();

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    name: "",
    description: "",
    imageUrl: "",
    type: "Cat",
  });

  const { name, description, imageUrl, type } = state;

  useEffect(() => {
    async function getCurrentPet() {
      if (petId) {
        const currentPet = await getOne(petId);

        dispatch({ type: "name", payload: currentPet.name });
        dispatch({ type: "description", payload: currentPet.description });
        dispatch({ type: "imageUrl", payload: currentPet.imageUrl });
        dispatch({ type: "type", payload: currentPet.type });
      }
    }

    getCurrentPet();
  }, [petId]);

  async function handleSubmit(e) {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const { name, type, description, imageUrl } = Object.fromEntries(formData);

    if (name && description && imageUrl && type) {
      if (!petId) {
        await create({ name, description, imageUrl, type }, token);
        navigate("/");
      } else {
        await edit({ _id: petId, name, description, imageUrl, type }, token);
        navigate(`/pets/${petId}`);
      }
    }
  }

  return (
    <section id="create-page" className="create">
      <form id="create-form" action="" method="POST" onSubmit={handleSubmit}>
        <fieldset>
          <legend>{petId ? "Edit Pet" : "Add new Pet"}</legend>
          <p className="field">
            <label htmlFor="name">Name</label>
            <span className="input">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  dispatch({ type: "name", payload: e.target.value })
                }
              />
            </span>
          </p>
          <p className="field">
            <label htmlFor="description">Description</label>
            <span className="input">
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  dispatch({ type: "description", payload: e.target.value })
                }
              ></textarea>
            </span>
          </p>
          <p className="field">
            <label htmlFor="image">Image</label>
            <span className="input">
              <input
                type="text"
                name="imageUrl"
                id="image"
                placeholder="Image"
                value={imageUrl}
                onChange={(e) =>
                  dispatch({ type: "imageUrl", payload: e.target.value })
                }
              />
            </span>
          </p>
          <p className="field">
            <label htmlFor="type">Type</label>
            <span className="input">
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) =>
                  dispatch({ type: "type", payload: e.target.value })
                }
              >
                <option value="cat">cat</option>
                <option value="dog">dog</option>
                <option value="parrot">parrot</option>
                <option value="reptile">reptile</option>
                <option value="other">other</option>
              </select>
            </span>
          </p>
          <input
            className="button submit"
            type="submit"
            value={petId ? "Edit Pet" : "Add Pet"}
          />
        </fieldset>
      </form>
    </section>
  );
}

export default CreatePet;
