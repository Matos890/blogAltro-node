import axios from 'https://cdn.skypack.dev/axios'; 

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    console.log(res.data.status);
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
        console.log("evvai");
      }, 1500);
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};
