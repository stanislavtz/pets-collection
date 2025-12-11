const BASE_URL = "http://localhost:3030";

export async function getAll() {
  try {
    const res = await fetch(`${BASE_URL}/data/pets?sortBy=_createdOn%20desc`);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function getOne(id) {
  try {
    const res = await fetch(`${BASE_URL}/data/pets/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function create(petData, token) {
  try {
    const res = await fetch(`${BASE_URL}/data/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify(petData),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function edit(petData, token) {
  try {
    const res = await fetch(`${BASE_URL}/data/pets/${petData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify(petData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function remove(petId, token) {
  try {
    const res = await fetch(`${BASE_URL}/data/pets/${petId}`, {
      method: "DELETE",
      headers: {
        "X-Authorization": token,
      },
    });

    if (!res.ok) {
      throw new Error("You can't delete this pet");
    }
  } catch (err) {
    console.log(err);
  }
}
