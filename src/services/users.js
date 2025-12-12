const BASE_URL = "http://localhost:3030";

export async function login(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok && res.status >= 500) {
      throw new Error("Something went wrong. Try again later");
    }

    if (!res.ok) {
      throw new Error("Email or password don't match!");
    }

    const data = await res.json();

    localStorage.setItem("user-data", JSON.stringify(data));

    return data;
  } catch (err) {
    return err;
  }
}

export async function register(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Wrong credentials. Try again.");
    }

    const data = await res.json();

    const userData = {
      _id: data._id,
      email: data.email,
      accessToken: data.accessToken,
    };

    localStorage.setItem("user-data", JSON.stringify(userData));

    return userData;
  } catch (err) {
    return err;
  }
}

export async function logout(token) {
  try {
    await fetch(`${BASE_URL}/users/logout`, {
      headers: {
        "X-Authorization": token,
      },
    });

    localStorage.removeItem("user-data");
  } catch (err) {
    return err;
  }
}

export async function getUser(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  console.log(res);
  const data = await res.json();
  return data;
}
