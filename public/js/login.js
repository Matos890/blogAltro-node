import axios from 'axios'; 

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
export const logout = async()=>{
try {
  const res = await axios({
    method:'GET',
    url: "http://localhost:7000/api/v1/users/logout",
    headers:{
      'Content-Type':null,
    }
  })
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.reload(true);
        console.log("evvai");
      }, 4500);
    }
  } catch (err) {
    console.log("error", err.response);
  }
}


export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:7000/api/v1/users/forgot-password",

      data: {
        email,

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

const thisUrl = window.location.href;
const token = thisUrl.split('/').pop();
export const resetPassword = async (password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "PATCH",
      url:`http://localhost:7000/api/v1/users/resetPassword/${token}` ,
      data: {
	      password,
	      passwordConfirm
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
        console.log("evvai");
      }, 500);
    }
  } catch(err) {
    console.error('Error:', err);
  }
};

export const updateUser = async (name,email) => {
  try {
    const res = await axios({
      method: "PATCH",
      url:`http://localhost:7000/api/v1/users/updateMe` ,
      data: {
        name,
        email,
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
        console.log("evvai");
      }, 500);
    }
  } catch(err) {
    console.error('Error:', err);
  }
};
export const updatePassword = async (passwordCurrent, password,passwordConfirm) => {
  try {
    const res = await axios({
      method: "PATCH",
      url:`http://localhost:7000/api/v1/users/updatePassword` ,
      data: {
        passwordCurrent,
	      password,
	      passwordConfirm
        
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
        console.log("evvai");
      }, 500);
    }
  } catch(err) {
    console.error('Error:', err);
  }
};
