import axios from 'https://cdn.skypack.dev/axios'; 

axios.defaults.withCredentials=true;
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:7000/api/v1/users/login",

      data: {
        email,
        password,
      },headers:{
	      'Content-Type': 'application/json'
      }
    });
    console.log(res.data.status);
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
        console.log("evvai");
      }, 4500);
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};
